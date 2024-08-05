import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileIcon  from '../../components/screens/profile/ProfileIcon'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ChatProvider } from '../context/ChatContext';
const TabLayout = () => {
  return (
    <ChatProvider>
<Tabs>
    <Tabs.Screen name="index" options={{
      //  title:"Home",
      headerShown:false,
        tabBarIcon:({focused})=>(
            <Entypo name="home" size={24} color="black" />
    )
    }}/>
        <Tabs.Screen name="Upload/index" options={
            {
                title:"Post",
                headerTitleAlign: 'center',
                tabBarIcon:({focused})=>(
<AntDesign name="pluscircle" size={24} color="black" />
            )
            }
            }/>
        <Tabs.Screen name="leaderboard/index" options={
            {
                title:"Leaderboard",
                //headerTitleAlign: 'center',
                tabBarIcon:({focused})=>(
                    <MaterialIcons name="leaderboard" size={24} color="black" />
                )

            }
            }/>
    <Tabs.Screen name="Profile/index" options={
        {
            title:"Profile",
            //headerShown:false,
            headerTitleAlign: 'center',
            tabBarIcon:({focused})=>(
                <ProfileIcon></ProfileIcon>
            )
            }}/>
                <Tabs.Screen name="PostDetails/[id]" options={
                    
        {

            href:null,
            title:"Post Details",
            headerTitleAlign: 'center',
            }}/>
            <Tabs.Screen name="chat/index" options={
        {
            href:null
            }}/>

<Tabs.Screen name="otherUserProfile/[id]" options={

        {
           // headerShown:false,
           title:"Profile",
           headerTitleAlign: 'center',
           headerShown:false,
            href:null
            }}/>
            <Tabs.Screen name="chatpage/[id]" options={

{
    headerShown:false,
   title:"chatpage",
   headerTitleAlign: 'center',
   
    href:null
    }}/>
</Tabs>
</ChatProvider>
  )
}

export default TabLayout