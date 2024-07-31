import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import HomeScreen from '@/components/screens/home/Home'
export default function index() {
  return (
<SafeAreaView>
    {/* <Frame6></Frame6> */}
    {/* <Text>home page</Text> */}
    <HomeScreen></HomeScreen>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({})