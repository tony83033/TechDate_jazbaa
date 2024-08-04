import React from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import Frame from '@/components/screens/auth';
import { useCustomFunction } from '@/app/context/techDateContext';
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from 'expo-auth-session';
import { auth } from "../../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged
} from 'firebase/auth';

export default function Register() {
  const { user, loading } = useCustomFunction();
  const redirectUri = makeRedirectUri();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "627954942332-f58195qb3bqllgl3auuafjs02vt1ggd1.apps.googleusercontent.com",
    redirectUri
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);


  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }}>
        <ActivityIndicator size="large" color="#4834DF" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      {user ? <Redirect href="/(tabs)/Profile" /> : <Frame promptAsync={promptAsync} />}
    </SafeAreaView>
  );
}