import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Profile from '@/components/screens/profile/Profile';
import { useRouter,Redirect } from 'expo-router';
import { getAuth } from "firebase/auth";
import { useCustomFunction } from '@/app/context/techDateContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Index() {
  const { userInfo, setUserInfo } = useCustomFunction();
  const router = useRouter();
 
  const checkLocalUser = async () => {
  
    try {
      const userJSON = await AsyncStorage.getItem('@user');
      if(userJSON!==null){
        const userData = userJSON ? JSON.parse(userJSON) : null;
      console.log("Local storage", userData);
      //setUserInfo(userData);
      setUserInfo(true)
      }
      
    } catch (e: any) {
      alert(e.message);
    } finally {
    //  setLoading(false);
    }
  };

  useEffect(() => {
    checkLocalUser();
  }, []);


  return (
    <SafeAreaView>
      {userInfo?       <Profile />: <Redirect href="/rigister" />}

    </SafeAreaView>
  );
}


export default Index;
