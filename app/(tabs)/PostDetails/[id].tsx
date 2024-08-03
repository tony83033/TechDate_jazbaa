import React from 'react'

import { useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { View, Text, SafeAreaView, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
function PostDetails() {


    const {id} = useLocalSearchParams()

    const [postInfo, setPostInfo] = useState<any>(null);

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    const postDb = getDatabase();
    const PostInfoRef = ref(postDb, 'posts');

    try {
      const snapshot = await get(PostInfoRef);
      if (snapshot.exists()) {
        const postDetails = await snapshot.val();
        const post = Object.values(postDetails).find((post: any) => post.postId === id);
        if (post) {
          setPostInfo(post);
        } else {
          console.log("No post found with this ID");
        }
      } else {
        console.log("No post data available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {postInfo && (
          <View style={styles.postContainer}>
            <View style={styles.userHeader}>
              <Image source={{ uri: postInfo.userProfileImageUrl }} style={styles.userAvatar} />
              <Text style={styles.userName}>{postInfo.userName}</Text>
            </View>
            
            {/* <Image source={{ uri: postInfo.imageurl }} style={styles.postImage} /> */}
            <Image source={{ uri: postInfo.imageUrl }} style={styles.postImage} />
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{postInfo.title}</Text>
              <Text style={styles.postDescription}>{postInfo.desc}</Text>
            </View>
            
            <View style={styles.engagement}>
              <Ionicons name="heart" size={24} color="red" />
              <Text style={styles.likeCount}>{postInfo.likeCount} likes</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  postContent: {
    padding: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: '#333',
  },
  engagement: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  likeCount: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
});
export default PostDetails