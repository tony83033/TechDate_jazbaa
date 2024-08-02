import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import HomeScreen from '@/components/screens/home/Home'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link,useRouter } from 'expo-router';
export default function index() {
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
    {/* <Frame6></Frame6> */}
    {/* <Text>home page</Text> */}
    <HomeScreen></HomeScreen>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({})