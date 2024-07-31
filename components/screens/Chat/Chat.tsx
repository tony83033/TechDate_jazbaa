import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

const data = [
  { id: '1', name: 'Grace', message: 'Can you pls help me set up k8s', time: '1 hour', profilePic: require("../../../assets/photo.png") },
  { id: '2', name: 'Chloe', message: 'I am getting an error in Jitsi server', time: '55 min', profilePic: require("../../../assets/photo1.png") },
  { id: '3', name: 'Penelope', message: 'I am not setting env variables', time: '50 min', profilePic: require("../../../assets/photo2.png") },
  { id: '4', name: 'Elizabeth', message: 'Thanks for helping me', time: '33 min', profilePic: require("../../../assets/photo3.png") },
  { id: '5', name: 'Abigail', message: 'Thanks Sumit', time: '27 min', profilePic: require("../../../assets/photo4.png") },
  { id: '6', name: 'Emelie', message: 'Emelie has sent you a Thanks note 😍', time: '23 min', profilePic: require("../../../assets/photo5.png") },
];

const Profile = ({ name, message, time, profilePic }:any) => (
  <View style={[styles.profileContainer,styles.marginBitween]}>
    <Image source={profilePic} style={styles.profilePic} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
    <Text style={styles.time}>{time}</Text>
  </View>
);

const ChatComponent = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </View> */}
     
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity>
          <Profile
            name={item.name}
            message={item.message}
            time={item.time}
            profilePic={item.profilePic}
          />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    backgroundColor: '#e6e6fa',
  },
  
  marginBitween:{
    margin:10
  },

  header: {
    height: 60,
    backgroundColor: '#e6e6fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#777',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default ChatComponent;
