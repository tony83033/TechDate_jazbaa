import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, Dimensions ,TouchableOpacity,ActivityIndicator} from 'react-native';
import { Href, useLocalSearchParams } from 'expo-router';
import { getDatabase, ref, get } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link,router } from 'expo-router';
const OtherUserProfile = () => {
  const { id } = useLocalSearchParams();
  const [userInfo, setUserInfo] = useState<any>(null);

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

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
  
  const SkillsList = ({ skills }: { skills: string[] }) => (
    <View style={styles.skillsList}>
      {skills && skills.length > 0 ? (
        skills.map((skill, index) => (
          <View key={index} style={styles.skillItem}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))
      ) : (
        <Text>No skills added yet</Text>
      )}
    </View>
  );
  
  const InterestsList = ({ interests }: { interests: string[] }) => (
    <View style={styles.interestsList}>
      {interests && interests.length > 0 ? (
        interests.map((interest, index) => (
          <View key={index} style={styles.interestItem}>
            <Text style={styles.interestText}>{interest}</Text>
          </View>
        ))
      ) : (
        <Text>No interests added yet</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {userInfo ? (
          <>
            <View style={styles.profileHeader}>
              <Image
                style={styles.profileImage}
                source={userInfo.imageUrl ? { uri: userInfo.imageUrl } : require("../../../assets/userIcon.png")}
              />
              <Text style={styles.userName}>{userInfo.username || "User"}</Text>
              

              {/* <Text style={styles.userBio}>{userInfo.bio || "No bio available"}</Text> */}


              {/* ========================= */}

              <View style={styles.skillsList}>

      
          <View  style={styles.skillItem}>
            <Text style={styles.skillText}>{userInfo.bio}</Text>
          </View>
      
      
       {/* <Text>No skills added yet</Text> */}
      
    </View>

              {/* =========================== */}

              {/* <Text style={styles.userId}>User ID: {userInfo.userId}</Text> */}
              <TouchableOpacity onPress={()=>{goToChat()}}><Ionicons name="chatbubble-ellipses" size={30} color="black" /></TouchableOpacity>
              
              
            </View>
            <Section title="Skills">
              <SkillsList skills={userInfo.skills || []} />
            </Section>
            <Section title="Interests">
              <InterestsList interests={userInfo.interests || []} />
            </Section>
            {/* <Section title="Additional Info">
              <Text>Email: {userInfo.email}</Text>
              <Text>Age: {userInfo.age || "Not specified"}</Text>
              <Text>Location: {userInfo.userLocation || "Not specified"}</Text>
              <Text>Rating: {userInfo.rating}</Text>
              <Text>Created At: {new Date(userInfo.createdAt).toLocaleDateString()}</Text>
              {userInfo.updatedAt && (
                <Text>Last Updated: {new Date(userInfo.updatedAt).toLocaleDateString()}</Text>
              )}
            </Section> */}
          </>
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }}>
          <ActivityIndicator
            size="large" color="#4834DF"
          />
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
    backgroundColor: "#e6e6fa",
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e6e6fa",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userBio: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
    textAlign: 'center',
  },
  userId: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  skillText: {
    color: "black",
    fontSize: 14,
  },
  interestsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestItem: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  interestText: {
    color: "black",
    fontSize: 14,
  },
});

export default OtherUserProfile;