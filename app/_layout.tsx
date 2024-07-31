import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from "expo-font";
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
  return (
  <Stack>
    {/* <Stack.Screen name="index" options={
        {
            headerShown: false
        }
    } />
    <Stack.Screen name="rigister/index" options={{title:"Register"}} />
    <Stack.Screen name="leaderboard" options={{
                  headerShown: false
    }
    } />

<Stack.Screen name="chat" options={{
                  headerShown: false
    }
    } />
    <Stack.Screen name="home" options={{
                  headerShown: false
    }
    } /> */}
    <Stack.Screen  name="(tabs)" options={{
      headerShown: false
    }}/>
  </Stack>
  )
}

export default _layout