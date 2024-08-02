import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Profile from '@/components/screens/profile/Profile';
import Frame from '@/components/screens/auth';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from 'expo-auth-session';
import { auth } from "../../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCustomFunction } from '../context/techDateContext';

WebBrowser.maybeCompleteAuthSession();

export default function Register() {
  const allFunction = useCustomFunction();
  const { userInfo, setUserInfo } = allFunction;
  const router = useRouter();
  const redirectUri = makeRedirectUri();

  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "627954942332-f58195qb3bqllgl3auuafjs02vt1ggd1.apps.googleusercontent.com",
    redirectUri
  });

  const checkLocalUser = async () => {
    setLoading(true);
    try {
      const userJSON = await AsyncStorage.getItem('@user');
      const userData = userJSON ? JSON.parse(userJSON) : null;
      console.log("Local storage", userData);
      setUserInfo(userData);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    checkLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
      } else {
        console.log("Not logged in");
        setUserInfo(null);
      }
    });
    return () => unsub();
  }, []);

  if (userInfo) {
    console.log("User logged in, sending to profile");
    router.push("/(tabs)/Profile");
    return null;
  } else {
    return (
      <SafeAreaView>
        <Frame promptAsync={promptAsync}></Frame>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
