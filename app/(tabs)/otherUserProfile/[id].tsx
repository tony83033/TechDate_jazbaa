import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, Dimensions ,TouchableOpacity,ActivityIndicator} from 'react-native';
import { Href, useLocalSearchParams } from 'expo-router';
import { getDatabase, ref, get } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link,router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const OtherUserProfile = () => {
  const { id } = useLocalSearchParams();
  const [userInfo, setUserInfo] = useState<any>(null);
  
  
  const [isCrush, setIsCrush] = useState(false);

  const toggleCrush = () => {
    setIsCrush(!isCrush);
    // Add logic to save crush status to backend
  };


  useEffect(() => {
    fetchUserInfo();
  }, [id]);


  // pathname: "/PostDetails/[id]",
  //       params: { id: item.postId },
  const goToChat = ()=>{
    router.push({
      pathname:"/chatpage/[id]",
      params:{
        id:id
      }
    })

}
  const fetchUserInfo = async () => {
    const userDb = getDatabase();
    const userInfoRef = ref(userDb, 'UsersProfile');

    try {
      const snapshot = await get(userInfoRef);
      if (snapshot.exists()) {
        const allUsers = snapshot.val();
        const userProfile = Object.values(allUsers).find((user: any) => user.userId === id);
        if (userProfile) {
          setUserInfo(userProfile);
        } else {
          console.log("No user found with this ID");
        }
      } else {
        console.log("No user data available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Helper components (Section, SkillsList, InterestsList) remain the same


  const ProfileHeader = ({ user }:any) => (
    <View style={styles.profileHeader}>
      <Image
        style={styles.profileImage}
        source={user.imageUrl ? { uri: user.imageUrl } : require("../../../assets/userIcon.png")}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.userName}>{user.username || "User"}</Text>
        <Text style={styles.userBio}>{user.bio || "No bio available"}</Text>
      </View>
    </View>
  );

  const ActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.crushButton} onPress={toggleCrush}>
        <Ionicons name={isCrush ? "heart" : "heart-outline"} size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>{isCrush ? "Crushed" : "Mark as Crush"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatButton} onPress={goToChat}>
        <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
  const Section = ({ title, children }:any) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
  const SkillsList = ({ skills }:any) => (
    <View style={styles.listContainer}>
      {skills && skills.length > 0 ? (
        skills.map((skill:any, index:any) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listItemText}>{skill}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No skills added yet</Text>
      )}
    </View>
  );
  
  const InterestsList = ({ interests }:any) => (
    <View style={styles.listContainer}>
      {interests && interests.length > 0 ? (
        interests.map((interest:any, index:any) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listItemText}>{interest}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No interests added yet</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      {userInfo ? (
        <>
          <ProfileHeader user={userInfo} />
          <ActionButtons />
          <Section title="Skills">
            <SkillsList skills={userInfo.skills || []} />
          </Section>
          <Section title="Interests">
            <InterestsList interests={userInfo.interests || []} />
          </Section>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4834DF" />
        </View>
      )}
    </ScrollView>
  </SafeAreaView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileHeader: {
    height: 300,
    justifyContent: 'flex-end',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  profileInfo: {
    padding: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  userBio: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#e6e6fa',
  },
  crushButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4834DF',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: '#333333',
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listItem: {
    backgroundColor: "#e6e6fa",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  listItemText: {
    color: "#333333",
    fontSize: 14,
  },
  emptyText: {
    color: '#999999',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
});

export default OtherUserProfile;