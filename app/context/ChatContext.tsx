import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db as database } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, push, set, update } from 'firebase/database';

const ChatContext = createContext<any>(null);

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }:any) => {
  const [user, setUser] = useState<any>(null);
  const [chats, setChats] = useState<any>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchUserChats(user.uid);
      } else {
        setChats({});
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserChats = (userId:any) => {
    const userChatsRef = ref(database, `userChats/${userId}`);
    onValue(userChatsRef, (snapshot) => {
      const chatsData = snapshot.val();
      setChats(chatsData || {});
    });
  };

  const createNewChat = async (otherUserId:any) => {
    if (!user) return;

    const newChatRef = push(ref(database, 'chats'));
    const chatId = newChatRef.key;

    await set(newChatRef, {
      participants: [user.uid, otherUserId],
      createdAt: Date.now()
    });

    const updates:any = {};
    updates[`userChats/${user.uid}/${chatId}`] = {
      otherUser: {
        userId: otherUserId,
        // Fetch other user's details and set them here
      }
    };
    updates[`userChats/${otherUserId}/${chatId}`] = {
      otherUser: {
        userId: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
    };

    await update(ref(database), updates);

    return chatId;
  };

  const sendMessage = async (chatId:any, messageText:any) => {
    if (!user) return;

    const newMessageRef = push(ref(database, `messages/${chatId}`));
    const messageId = newMessageRef.key;

    const messageData = {
      text: messageText,
      createdAt: Date.now(),
      user: {
        _id: user.uid,
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    await set(newMessageRef, messageData);

    const updates:any = {};
    updates[`chats/${chatId}/lastMessage`] = {
      text: messageText,
      createdAt: Date.now(),
      sender: user.uid
    };
    updates[`userChats/${user.uid}/${chatId}/lastMessage`] = {
      text: messageText,
      createdAt: Date.now()
    };
    // Update for the other participant
    const otherUserId = Object.keys(chats[chatId].participants).find(id => id !== user.uid);
    updates[`userChats/${otherUserId}/${chatId}/lastMessage`] = {
      text: messageText,
      createdAt: Date.now()
    };

    await update(ref(database), updates);
  };

  return (
    <ChatContext.Provider value={{ user, chats, createNewChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};