
import { Stack } from 'expo-router'
import { useFonts } from "expo-font";
import { FirebaseProvider } from './context/techDateContext';
import { FirebaseAuthProvider } from './context/techDateAuthContext';
// ================================================
import { StyleSheet, Text, View,SafeAreaView,Image,ActivityIndicator } from 'react-native'
import React from 'react'

import Frame from '@/components/screens/auth';
import HomeScreen from '@/components/screens/home/Home';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged
} from 'firebase/auth'
import {auth} from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link,router } from 'expo-router';
import { useState,useEffect } from 'react';
const _layout = () => {
  const [fontsLoaded, error] = useFonts({
    "Baumans-Regular": require("../assets/fonts/Baumans-Regular.ttf"),
    "InriaSans-Regular": require("../assets/fonts/InriaSans-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inika": require("../assets/fonts/Inika.ttf"),
    "Inika-Bold": require("../assets/fonts/Inika-Bold.ttf"),
    "Abel-Regular": require("../assets/fonts/Abel-Regular.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  // =========================Login of login and home screen===========

  return (
    <FirebaseProvider>

  <Stack>
    


    
    <Stack.Screen  name="(tabs)" options={{
      headerShown: false
    }}/>
    <Stack.Screen  name="(auth)" options={{
      
      //title:"Register"
        headerShown: false
      }} />
       
  </Stack>

  </FirebaseProvider>
  )
}

export default _layout