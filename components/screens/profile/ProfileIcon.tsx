import React from 'react'
import { useState,useEffect } from 'react';
import { View, Text,Image } from 'react-native'
import { getDatabase, ref, onValue } from "firebase/database";
import { signOut, getAuth } from "firebase/auth";
const ProfileIcon = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userInfo) {
      fetchImageUrl();
      //fetchBio();
    }
  }, [userInfo]);

  const fetchImageUrl = () => {
    const db = getDatabase();
    const imageUrlRef = ref(db, `UsersProfile/${userInfo.uid}/imageUrl`);
    
    onValue(imageUrlRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setImageUrl(data);
      } else {
        setImageUrl('');
      }
    });
  };
  const getCurrentUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserInfo(user);
      console.log("Profile",user);
    } else {
      console.log("Not logged in");
    }
  };
  return (
    <View>
        <Image source={imageUrl ? { uri: imageUrl } : require("../../../assets/userIcon.png")} style={{width:30,height:28,
          borderRadius:50
        }} ></Image>
    </View>
  )
}

export default ProfileIcon