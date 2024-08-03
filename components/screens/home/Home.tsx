import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';
import {useCustomFunction} from "../../../app/context/techDateContext"
import HomeHeader from './HomeHeader';
import { useEffect } from 'react';
import { Link ,router,} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostItem = ({ item }: any) => (
  <View style={styles.postContainer}>
    
    <View style={styles.postHeader}>
      <TouchableOpacity onPress={() => router.push(`/otherUserProfile/${item.userId}`)}>
      <Image source={{ uri: item.userProfileImageUrl }} style={styles.userProfile} />
      </TouchableOpacity>
      <Text style={styles.username}>{item.userName}</Text>
      <Entypo name="dots-three-horizontal" size={24} color="black" style={styles.moreIcon} />
    </View>
    <TouchableOpacity onPress={() => router.push({
      pathname: "/PostDetails/[id]",
      params: { id: item.postId },
    })}>
      <Text style={styles.postDesc}>{item.title}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </TouchableOpacity>
    <View style={styles.postFooter}>
      <View style={styles.actions}>
        <TouchableOpacity>
          <FontAwesome name="heart-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Feather name="message-circle" size={24} color="black" style={styles.actionIcon} /> */}
          <FontAwesome name="commenting-o" size={24} style={styles.actionIcon} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Feather name="send" size={24} color="black" style={styles.actionIcon} /> */}
          {/* <Entypo name="hand" size={24} color="black" style={styles.actionIcon} /> */}
          <FontAwesome name="handshake-o" size={24} style={styles.actionIcon} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.likes}>{item.likes} likes</Text>
      <Text style={styles.comments}>{item.comments} comments</Text>
    </View>
  </View>
);

const InstagramFeed = () => {
  const { FetchPosts, posts } = useCustomFunction();

  useEffect(() => {
    FetchPosts();
  }, []);

  return (
    <SafeAreaView>
    <HomeHeader></HomeHeader>
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem item={item} />}
      keyExtractor={(item) => item.id}
      style={styles.feed}
    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  feed: {
    backgroundColor: '#e6e6fa',
  },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    padding:14,
    paddingBottom: 10,
    marginBottom: 10,
   // borderWidth: 1,
    borderColor: "black",
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    marginLeft: 10,
    fontWeight: 'bold',
    flex: 1,
  },
  moreIcon: {
    marginLeft: 'auto',
  },
  postDesc: {
    padding: 10,
  },
  postImage: {
    width: '100%',
    height: 400,
    borderRadius:10
  },
  postFooter: {
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  actionIcon: {
    marginLeft: 15,
  },
  likes: {
    fontWeight: 'bold',
  },
  comments: {
    color: 'gray',
  },
});

export default InstagramFeed;