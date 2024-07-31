import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';
import { Link ,router,} from 'expo-router';
const data = [
  {
    id: '1',
    username: 'john_doe',
    userProfile: 'https://randomuser.me/api/portraits/men/1.jpg',
    postDesc: 'Had a great time at the beach today!',
    postImage: require("../../../assets/helperror.png"),
    likes: 120,
    comments: 5,
  },
  {
    id: '2',
    username: 'jane_doe',
    userProfile: 'https://randomuser.me/api/portraits/women/1.jpg',
    postDesc: 'Lovely sunset view from my balcony',
    postImage: require("../../../assets/helperror.png"),
    likes: 200,
    comments: 10,
  },
  // Add more posts here
];

const PostItem = ({ item }:any) => (
  <View style={styles.postContainer}>
    <View style={styles.postHeader}>
      <Image source={{ uri: item.userProfile }} style={styles.userProfile} />
      <Text style={styles.username}>{item.username}</Text>
      <Entypo name="dots-three-horizontal" size={24} color="black" style={styles.moreIcon} />
    </View>
<TouchableOpacity onPress={()=>router.push(`/PostDetails/${item.id}`)}>
    <Text style={styles.postDesc}>{item.postDesc}</Text>
    <Image source={ item.postImage } style={styles.postImage} />
    </TouchableOpacity>
    <View style={styles.postFooter}>
      <View style={styles.actions}>
        <TouchableOpacity>
          <FontAwesome name="heart-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="message-circle" size={24} color="black" style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="send" size={24} color="black" style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.likes}>{item.likes} likes</Text>
      <Text style={styles.comments}>{item.comments} comments</Text>
    </View>
    

  </View>
);

const InstagramFeed = () => (
  <FlatList
    data={data}
    renderItem={({ item }) => 
  //    <Link href={`/PostDetails/${item.id}`} >
    <PostItem item={item} />
 //   </Link>
  }
    keyExtractor={item => item.id}
    style={styles.feed}
  />
);

const styles = StyleSheet.create({
  feed: {
    backgroundColor: '#fff',
  },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    paddingBottom: 10,
    marginBottom: 10,
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
