import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import ChatComponent from '@/components/screens/Chat/Chat'
export default function index() {
  return (
<SafeAreaView style={styles.container} >
    <ChatComponent></ChatComponent>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"red"
  }
})