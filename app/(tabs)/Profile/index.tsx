import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Profile from '@/components/screens/profile/Profile';
import { useRouter } from 'expo-router';
import { getAuth } from "firebase/auth";
import { useCustomFunction } from '@/app/context/techDateContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Index() {
  const { userInfo, setUserInfo } = useCustomFunction();
  const router = useRouter();
  const [localUser,setLocalUser] = useState<boolean>(false)
  const checkLocalUser = async () => {
  
    try {
      const userJSON = await AsyncStorage.getItem('@user');
      if(userJSON!==null){
        const userData = userJSON ? JSON.parse(userJSON) : null;
      console.log("Local storage", userData);
      //setUserInfo(userData);
      setLocalUser(true)
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

  if(localUser===false){
    router.push("/rigister")
  }
  return (
    <SafeAreaView>
      <Profile />
    </SafeAreaView>
  );
}


export default Index;
