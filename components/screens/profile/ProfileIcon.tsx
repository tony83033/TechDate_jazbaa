import React from 'react'
import { View, Text,Image } from 'react-native'
const ProfileIcon = () => {
  return (
    <View>
        <Image source={require("../../../assets/sumit.jpg")} style={{width:30,height:28,
          borderRadius:50
        }} ></Image>
    </View>
  )
}

export default ProfileIcon