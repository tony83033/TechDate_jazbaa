import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VELOCITY_EPS } from 'react-native-reanimated/lib/typescript/reanimated2/animation/decay/utils';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link,router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const HomeHeader = () => {
    const goToPost = ()=>{
        router.push("/Upload"
        )
    }
    const goToChat = ()=>{
        router.push(
            "/chat"
        )
    }
  return (
    <View style={styles.header}>
      {/* Logo */}
      <View style={{alignItems:'flex-start'}}>
      <Image
        source={require('../../../assets/logo.png')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      /> 
      </View>
      {/* */}
     

      {/* Icons */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => alert("Search is Under Development")}>
        {/* <AntDesign name="plussquare" size={24} color="white" style={{borderRadius:20}} /> */}
        {/* <AntDesign name="pluscircle" size={24} color="white" style={{borderRadius:20}} /> */}
        {/* <Ionicons name="search-circle" size={25} color="white" style={{borderRadius:20}} /> */}
        <FontAwesome name="search" size={24} color="white"  style={{borderRadius:20}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() =>  alert("Notifications is Under Development")}>
        <MaterialIcons name="notifications-active" size={24} color="white" style={{borderRadius:20}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() =>  goToChat()}>
        <Ionicons name="chatbubble-ellipses" size={24} color="white" style={{borderRadius:20}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 15,
     paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    backgroundColor: 'black',
  },
  logo: {
    width: 100,
    height: 30,
    marginLeft: -20,
    borderRadius:50,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconButton: {
     marginLeft: 20,
  },
});

export default HomeHeader;