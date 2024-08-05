import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot, orderBy, getDoc, doc } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ChatData {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserProfilePic: string;
  lastMessage: string;
  lastMessageTimestamp: Date;
  unreadCount: number;
}

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
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
      const chatPromises = querySnapshot.docs.map(async (chatDoc) => {
        const data = chatDoc.data();
        const otherUserId = data.participants.find((id: string) => id !== currentUser.uid);
        
        const userDoc = await getDoc(doc(db, 'users', otherUserId));
        const userData = userDoc.data();
  
        return {
          id: chatDoc.id,
          otherUserId,
          otherUserName: userData?.displayName || 'Unknown User',
          otherUserProfilePic: userData?.photoURL || 'https://via.placeholder.com/150',
          lastMessage: data.lastMessage?.text || 'No messages yet',
          lastMessageTimestamp: data.lastMessage?.createdAt.toDate() || new Date(),
          unreadCount: Math.floor(Math.random() * 5), // Simulated unread count
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
      <LinearGradient
        colors={['#e6e6fa', '#FFFFFF']}
        style={styles.chatItemGradient}
      >
        <Image source={{ uri: item.otherUserProfilePic }} style={styles.profilePic} />
        <View style={styles.chatInfo}>
          <Text style={styles.userName}>{item.otherUserName}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.timestamp}>{formatDate(item.lastMessageTimestamp)}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4834DF" />
      </View>
    );
  }

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <LinearGradient
        colors={['#e6e6fa', '#FFFFFF']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity style={styles.newChatButton}>
          <Ionicons name="create-outline" size={24} color="#4834DF" />
        </TouchableOpacity>
      </LinearGradient>
      {chats.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="chatbubbles-outline" size={64} color="#4834DF" />
          <Text style={styles.emptyStateText}>No chats yet. Start a new conversation!</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4834DF',
  },
  newChatButton: {
    padding: 8,
  },
  listContainer: {
    paddingVertical: 10,
  },
  chatItem: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chatItemGradient: {
    flexDirection: 'row',
    padding: 15,
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
    color: '#333333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 5,
  },
  unreadBadge: {
    backgroundColor: '#4834DF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});