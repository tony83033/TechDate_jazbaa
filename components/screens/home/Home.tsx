import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Animated,Dimensions } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomFunction } from "../../../app/context/techDateContext";
import HomeHeader from './HomeHeader';

import { router } from 'expo-router';

// Color scheme and theme
const colors = {
  primary: '#4A90E2',
  secondary: '#50E3C2',
  background: '#F8F8F8',
  text: '#333333',
  lightText: '#777777',
  white: '#FFFFFF',
  separator: '#E0E0E0',
};

// Spacing
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Typography
const typography = {
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
  caption: {
    fontSize: 12,
    color: colors.lightText,
  },
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ActionButton = ({ icon, count, onPress }:any) => {
  const scale = new Animated.Value(1);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
    onPress();
  };

  return (
    <AnimatedTouchable 
      onPress={animatePress} 
      style={[styles.actionButton, { transform: [{ scale }] }]}
    >
      {icon}
      {count !== undefined && <Text style={styles.actionText}>{count}</Text>}
    </AnimatedTouchable>
  );
};

const PostItem = ({ item }: any) => (
  <View style={styles.postContainer}>
    <View style={styles.postHeader}>
      <TouchableOpacity onPress={() => router.push(`/otherUserProfile/${item.userId}`)}>
        <Image source={{ uri: item.userProfileImageUrl }} style={styles.userProfile} />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <Text style={styles.usernamestyle}>{item.userName}</Text>
        <Text style={styles.timestamp}>2 hours ago</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Entypo name="dots-three-horizontal" size={20} color={colors.lightText} />
      </TouchableOpacity>
    </View>
    
    <TouchableOpacity 
      onPress={() => router.push({
        pathname: "/PostDetails/[id]",
        params: { id: item.postId },
      })}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </TouchableOpacity>
    
    <View style={styles.postFooter}>
      <View style={styles.actions}>
        <ActionButton 
          icon={<FontAwesome name="heart-o" size={24} color={colors.primary} />}
          count={item.likes}
          onPress={() => console.log('Like pressed')}
        />
       
        <ActionButton 
          icon={<FontAwesome name="handshake-o" size={24} color={colors.primary} />}
          onPress={() => console.log('Handshake pressed')}
        />
         <ActionButton 
          icon={<FontAwesome name="comment-o" size={24} color={colors.primary} />}
          count={item.comments}
          onPress={() => console.log('Comment pressed')}
        />
      </View>
      <View style={styles.countsContainer}>
        <Text style={styles.countText}>{item.likeCount} likes</Text>
        <Text style={styles.countText}>{item.commentCount} comments</Text>
      </View>
    </View>
  </View>
);

const InstagramFeed = () => {
  const { FetchPosts, posts } = useCustomFunction();

  useEffect(() => {
    FetchPosts();
  }, []);

  const renderItem = useCallback(({ item }:any) => <PostItem item={item} />, []);
  const keyExtractor = useCallback((item:any) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
 //   flex: 1,
    //backgroundColor: colors.background,
    //paddingTop: 10,
    backgroundColor: '#e6e6fa',
    height:Dimensions.get("window").height
  },
  
  feedContent: {
    paddingBottom: spacing.xl,
  },
  postContainer: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,  // Add horizontal margin
    marginVertical: spacing.sm,    // Add vertical margin
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: spacing.sm,  // Add padding on all sides
  },
  
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  userProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  usernamestyle: {
    
  },
  timestamp: {
    ...typography.caption,
  },
  moreButton: {
    padding: spacing.xs,
  },
  postTitle: {
    ...typography.body,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  postFooter: {
    padding: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,  // Add some space between actions and counts
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    ...typography.caption,
    marginLeft: spacing.xs,
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countText: {
    ...typography.caption,
    color: colors.lightText,
  },
 
});

export default InstagramFeed;