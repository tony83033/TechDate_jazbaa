import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Ionicons } from '@expo/vector-icons';

const skills = ["MERN App", "Docker", "React Native", "AWS", "Azure", "Kubernetes"];
const interests = ["Coding", "Problem Solving", "Technology", "Innovation", "Web Development"];

const ProfileHeader = ({ userInfo, onSignOut }:any) => (
  <View style={styles.profileHeader}>
    <Image
      style={styles.profileImage}
      contentFit="cover"
      source={require("../../../assets/sumit.jpg")}
    />
    <Text style={styles.userName}>{userInfo?.displayName || "User"}</Text>
    <Text style={styles.userBio}>Love to solve Error's</Text>
    <TouchableOpacity style={styles.signOutButton} onPress={onSignOut}>
      <Text style={styles.signOutText}>Log Out</Text>
    </TouchableOpacity>
  </View>
);

const Section = ({ title, children, onAddPress }:any) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onAddPress}>
        <Ionicons name="add-circle-outline" size={30} color="green" />
      </TouchableOpacity>
    </View>
    {children}
  </View>
);

const SkillsList = ({ skills }:any) => (
  <View style={styles.skillsList}>
    {skills.map((skill:any, index:any) => (
      <View key={index} style={styles.skillItem}>
        <Text style={styles.skillText}>{skill}</Text>
      </View>
    ))}
  </View>
);

const InterestsList = ({ interests }:any) => (
  <View style={styles.interestsList}>
    {interests.map((interest:any, index:any) => (
      <View key={index} style={styles.interestItem}>
        <Text style={styles.interestText}>{interest}</Text>
      </View>
    ))}
  </View>
);

const Profile = () => {
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserInfo(user);
    } else {
      console.log("Not logged in");
    }
  };

  const userSignOut = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.setItem('@user', "");
      console.log("User signed out successfully");
      router.push("rigister");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAddSkill = () => {
    // Implement add skill functionality
    console.log("Add skill pressed");
  };

  const handleAddInterest = () => {
    // Implement add interest functionality
    console.log("Add interest pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader userInfo={userInfo} onSignOut={userSignOut} />
        <Section title="Skills" onAddPress={handleAddSkill}>
          <SkillsList skills={skills} />
        </Section>
        <Section title="Interests" onAddPress={handleAddInterest}>
          <InterestsList interests={interests} />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e6fa",
    height: Dimensions.get("window").height
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
  },
  signOutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signOutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    margin: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
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
    padding: 20,
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
    padding: 20,
  },
  interestText: {
    color: "black",
    fontSize: 14,
  },
});

export default Profile;