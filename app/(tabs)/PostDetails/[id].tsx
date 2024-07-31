import React from 'react'
import { View,Text,SafeAreaView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
function PostDetails() {
    const {id} = useLocalSearchParams()
  return (
    <SafeAreaView>
        <View>
            <Text>Hii Mom</Text>
            <Text>{id}</Text>
        </View>
    </SafeAreaView>
  )
}

export default PostDetails