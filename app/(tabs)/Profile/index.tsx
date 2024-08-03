import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Profile from '@/components/screens/profile/Profile';
import { useRouter, Redirect } from 'expo-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { useCustomFunction } from '@/app/context/techDateContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Index() {
  const { userInfo, setUserInfo } = useCustomFunction();
  const router = useRouter();
  const auth = getAuth();
  const db = getDatabase();
  const [profileChecked, setProfileChecked] = useState(false);

  const checkLocalUser = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('@user');
      if (userJSON !== null) {
        const userData = JSON.parse(userJSON);
        console.log("Local storage", userData);
        setUserInfo(true);
      }
    } catch (e:any) {
      alert(e.message);
    }
  };

  const checkAndCreateUserProfile = async (user:any) => {
    if (user) {
      const userRef = ref(db, 'UsersProfile/' + user.uid);
      const snapshot = await get(userRef);
      
      if (!snapshot.exists()) {
        // User profile doesn't exist, create it
        await set(userRef, {
          imageUrl: '',
          userId: user.uid,
          username: user.displayName,
          email: user.email,
          bio: 'Love to solve Errors',
          skills: [],
          interests: [],
          rating: 0,
          userLocation: '',
          age: '',
          crush: '',
          postsId: [],
          createdAt: new Date().toISOString(),
        });
      }
      setProfileChecked(true);
    }
  };

  useEffect(() => {
    checkLocalUser();
  }, []);

  useEffect(() => {
    if (userInfo) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          checkAndCreateUserProfile(user);
        } else {
          setProfileChecked(true);
        }
      });
      return () => unsubscribe();
    }
  }, [userInfo]);

  if (userInfo && !profileChecked) {
    return null; // or a loading indicator
  }

  return (
    <SafeAreaView>
      {userInfo ? <Profile /> : <Redirect href="/rigister" />}
    </SafeAreaView>
  );
}

export default Index;