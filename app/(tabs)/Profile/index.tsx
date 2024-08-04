import React from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import Profile from '@/components/screens/profile/Profile';
import { Redirect } from 'expo-router';
import { useCustomFunction } from '@/app/context/techDateContext';


function Index() {
  const { user, loading } = useCustomFunction();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }}>
        <ActivityIndicator size="large" color="#4834DF" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      {user ? <Profile /> : <Redirect href="/(auth)" />}
    </SafeAreaView>
  );
}

export default Index;