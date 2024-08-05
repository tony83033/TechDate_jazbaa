import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot, orderBy, getDoc, doc } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';
import { useRouter } from 'expo-router';

interface ChatData {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserProfilePic: string;
  lastMessage: string;
  lastMessageTimestamp: Date;
}

export default function HomeScreen() {
  const [chats, setChats] = useState<ChatData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
  
    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUser.uid),
      orderBy('lastMessage.createdAt', 'desc')
    );
  
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const chatPromises = querySnapshot.docs.map(async (chatDoc) => {  // Changed 'doc' to 'chatDoc'
        const data = chatDoc.data();
        const otherUserId = data.participants.find((id: string) => id !== currentUser.uid);
        
        // Fetch other user's details
        const userDoc = await getDoc(doc(db, 'users', otherUserId));
        const userData = userDoc.data();
  
        return {
          id: chatDoc.id,  // Changed 'doc.id' to 'chatDoc.id'
          otherUserId,
          otherUserName: userData?.displayName || 'Unknown User',
          otherUserProfilePic: userData?.photoURL || 'https://via.placeholder.com/150',
          lastMessage: data.lastMessage?.text || 'No messages yet',
          lastMessageTimestamp: data.lastMessage?.createdAt.toDate() || new Date(),
        };
      });
  
      const chatData = await Promise.all(chatPromises);
      setChats(chatData);
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const dayDiff = Math.floor(diff / (1000 * 3600 * 24));

    if (dayDiff === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (dayDiff < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const renderChatItem = ({ item }: { item: ChatData }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => router.push(`/chatpage/${item.otherUserId}`)}
    >
      <Image source={{ uri: item.otherUserProfilePic }} style={styles.profilePic} />
      <View style={styles.chatInfo}>
        <Text style={styles.userName}>{item.otherUserName}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <Text style={styles.timestamp}>{formatDate(item.lastMessageTimestamp)}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading chats...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: 10,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
});