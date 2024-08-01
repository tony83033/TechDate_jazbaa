import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileIcon  from '../../components/screens/profile/ProfileIcon'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const TabLayout = () => {
  return (
<Tabs>
    <Tabs.Screen name="index" options={{
        title:"Home",
        tabBarIcon:({focused})=>(
            <Entypo name="home" size={24} color="black" />
    )
    }}/>
        <Tabs.Screen name="Upload/index" options={
            {
                title:"Post",
                tabBarIcon:({focused})=>(
<AntDesign name="pluscircle" size={24} color="black" />
            )
            }
            }/>
        <Tabs.Screen name="leaderboard/index" options={
            {
                title:"Leaderboard",
                tabBarIcon:({focused})=>(
                    <MaterialIcons name="leaderboard" size={24} color="black" />
                )

            }
            }/>
    <Tabs.Screen name="Profile/index" options={
        {
            title:"Profile",
            tabBarIcon:({focused})=>(
                <ProfileIcon></ProfileIcon>
            )
            }}/>
                <Tabs.Screen name="PostDetails/[id]" options={
        {
            href:null
            }}/>
            <Tabs.Screen name="chat/index" options={
        {
            href:null
            }}/>
</Tabs>
  )
}

export default TabLayout