import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
  limit,
  getFirestore
} from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

export default function Chat() {
  const { id } = useLocalSearchParams();
  const database = getFirestore();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
  
    const setupChat = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) throw new Error('No user is currently logged in');
  
      const chatId = [currentUser.uid, id].sort().join("_");
      console.log("This is current user id",currentUser.uid);
      console.log("This is other user id",id)
      console.log("this is chat id",chatId)
      const chatDocRef = doc(database, 'chats', chatId);
  
      try {
        await setDoc(chatDocRef, {
          participants: [currentUser.uid, id],
          createdAt: serverTimestamp(),
          lastMessage: null
        }, { merge: true });
  
        // Set up user profile
        const userDocRef = doc(database, 'users', currentUser.uid);
        await setDoc(userDocRef, {
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        }, { merge: true });
  
        // Listen for messages
        const collectionRef = collection(database, `chats/${chatId}/messages`);
        const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(50));
  
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            })) as IMessage[]
          );
        });
      } catch (error) {
        console.error('Error setting up chat:', error);
      }
    };
  
    setupChat();
  
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [id, database]); // Added id and database to dependency array
  const onSend = useCallback(async (messages: IMessage[] = []) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No user is currently logged in');

    const chatId = [currentUser.uid, id].sort().join("_");
    const { _id, createdAt, text, user } = messages[0];

    try {
      // Add message to Firestore
      const messageDocRef = await addDoc(collection(database, `chats/${chatId}/messages`), {
        _id,
        createdAt,
        text,
        user
      });

      // Update last message in chat document
      await updateDoc(doc(database, 'chats', chatId), {
        lastMessage: {
          text,
          createdAt,
          senderId: user._id
        }
      });

      // Update local state
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

      // Set read receipt
      const readRef = doc(database, `chats/${chatId}/readStatus/${currentUser.uid}`);
      await setDoc(readRef, { lastRead: serverTimestamp() });

    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show a toast message)
    }
  }, [id]);

  const onInputTextChanged = useCallback((text: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const chatId = [currentUser.uid, id].sort().join("_");
    const typingRef = doc(database, `chats/${chatId}/typing/${currentUser.uid}`);
    
    if (text.length > 0) {
      setDoc(typingRef, { isTyping: true });
    } else {
      setDoc(typingRef, { isTyping: false });
    }
  }, [id]);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      onInputTextChanged={onInputTextChanged}
      messagesContainerStyle={{
        backgroundColor: '#fff'
      }}
      user={{
        _id: auth?.currentUser?.email ?? '',
        avatar: 'https://i.pravatar.cc/300'
      }}
    />
  );
}