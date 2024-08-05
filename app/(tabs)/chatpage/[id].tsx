import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,ActivityIndicator } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../../firebaseConfig';
import { useLocalSearchParams } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { IMessage } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
interface User {
  _id: string;
  name: string;
  avatar: string;
}

interface ChatProps {
  id: string;
}

const Chat: React.FC<ChatProps> = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const database = getFirestore();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [processedMessageIds, setProcessedMessageIds] = useState(new Set<string>());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    const setupChat = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user is currently logged in');
  
      const chatId = [currentUser.uid, id].sort().join("_");
      const chatDocRef = doc(database, 'chats', chatId);
  
      try {
        await setDoc(chatDocRef, {
          participants: [currentUser.uid, id],
          createdAt: serverTimestamp(),
          lastMessage: null
        }, { merge: true });
  
        const userDocRef = doc(database, 'users', currentUser.uid);
        await setDoc(userDocRef, {
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        }, { merge: true });
  
        const collectionRef = collection(database, `chats/${chatId}/messages`);
        const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(50));
  
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newMessages = querySnapshot.docs
            .map(doc => ({
              _id: doc.id,
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
  
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [id, database]);

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

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No user is currently logged in');

    const chatId = [currentUser.uid, id].sort().join("_");
    const { createdAt, text, user } = messages[0];
    const _id = uuidv4();

    try {
      await addDoc(collection(database, `chats/${chatId}/messages`), {
        _id,
        createdAt,
        text,
        user
      });

      await updateDoc(doc(database, 'chats', chatId), {
        lastMessage: {
          text,
          createdAt,
          senderId: user._id
        }
      });

      // setMessages(previousMessages => deduplicateMessages(GiftedChat.append(previousMessages, messages)));
      // updateProcessedMessageIds(messages);

      const readRef = doc(database, `chats/${chatId}/readStatus/${currentUser.uid}`);
      await setDoc(readRef, { lastRead: serverTimestamp() });

    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [id, database]);

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

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#4834DF',
          },
          left: {
            backgroundColor: '#e6e6fa',
          },
        }}
        textStyle={{
          right: {
            color: '#FFFFFF',
          },
          left: {
            color: '#333333',
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send
        {...props}
        containerStyle={styles.sendContainer}
      >
        <Ionicons name="send" size={24} color="#4834DF" />
      </Send>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4834DF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#e6e6fa', '#FFFFFF']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </LinearGradient>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        onInputTextChanged={onInputTextChanged}
        user={{
          _id: auth?.currentUser?.email ?? '',
          avatar: 'https://i.pravatar.cc/300'
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        alwaysShowSend
        scrollToBottom
        scrollToBottomComponent={() => (
          <Ionicons name="chevron-down-circle" size={36} color="#4834DF" />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 16,
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFFFFF',
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
});

export default Chat;