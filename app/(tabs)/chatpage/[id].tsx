import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
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
import { v4 as uuidv4 } from 'uuid';

export default function Chat() {
  // Step 2: Define state variables
  const { id } = useLocalSearchParams();
  const database = getFirestore();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [processedMessageIds, setProcessedMessageIds] = useState(new Set<string>());
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // Step 3: Implement useEffect for setting up the chat
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    const setupChat = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user is currently logged in');
  
      // Generate a unique chat ID
      const chatId = [currentUser.uid, id].sort().join("_");
      
      const chatDocRef = doc(database, 'chats', chatId);
  
      try {
        // Set up or update chat document
        await setDoc(chatDocRef, {
          participants: [currentUser.uid, id],
          createdAt: serverTimestamp(),
          lastMessage: null
        }, { merge: true });
  
        // Set up or update user profile
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
          const newMessages = querySnapshot.docs
            .map(doc => ({
              _id: doc.id, // Use Firestore document ID as the message ID
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
            .filter(message => !processedMessageIds.has(message._id)) as IMessage[];

          if (newMessages.length > 0) {
            setMessages(prevMessages => deduplicateMessages(GiftedChat.append(prevMessages, newMessages)));
            updateProcessedMessageIds(newMessages);
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error setting up chat:', error);
        setIsLoading(false);
      }
    };
  
    setupChat();
  
    // Cleanup function
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [id, database]);

  // Step 4: Create helper functions for message handling
  const deduplicateMessages = (messages: IMessage[]): IMessage[] => {
    return messages.filter((message, index, self) => 
      index === self.findIndex((t) => t._id === message._id)
    );
  };

  const updateProcessedMessageIds = (newMessages: IMessage[]) => {
    setProcessedMessageIds(prevIds => {
      const newIds = new Set(prevIds);
      newMessages.forEach(message => newIds.add(message._id.toString()));
      return newIds;
    });
  };

  // Step 5: Implement the onSend function
  const onSend = useCallback(async (messages: IMessage[] = []) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No user is currently logged in');

    const chatId = [currentUser.uid, id].sort().join("_");
    const { createdAt, text, user } = messages[0];
    const _id = uuidv4(); // Generate a unique ID for the message

    try {
      // Add message to Firestore
      await addDoc(collection(database, `chats/${chatId}/messages`), {
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
      setMessages(previousMessages => deduplicateMessages(GiftedChat.append(previousMessages, messages)));
      updateProcessedMessageIds(messages);

      // Set read receipt
      const readRef = doc(database, `chats/${chatId}/readStatus/${currentUser.uid}`);
      await setDoc(readRef, { lastRead: serverTimestamp() });

    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show a toast message)
    }
  }, [id, database]);

  // Step 6: Implement the onInputTextChanged function
  const onInputTextChanged = useCallback((text: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const chatId = [currentUser.uid, id].sort().join("_");
    const typingRef = doc(database, `chats/${chatId}/typing/${currentUser.uid}`);
    
    // Update typing status
    if (text.length > 0) {
      setDoc(typingRef, { isTyping: true });
    } else {
      setDoc(typingRef, { isTyping: false });
    }
  }, [id]);

  // Step 7: Render the component with loading state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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