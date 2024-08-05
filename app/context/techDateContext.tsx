import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { db, auth} from '@/firebaseConfig';
import { push, set, ref as dbRef, onValue,update, child,get,getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from "firebase/auth";
import { increment } from "firebase/firestore";
interface FirebaseContextType {
  UploadPost: ({ title, desc, imageurl }: { title: string; desc: string; imageurl: string }) => void;
  FetchPosts: () => void;
  posts: any[];
  userInfo: any;
  setUserInfo: any;
  UploadProfilePhoto: ({imageurl}:{imageurl:string}) => void;
  addSkillInDb: ({newSkill}:{newSkill:any}) => void;
  addInterestINDb: ({newInterest}:{newInterest:any}) => void;
  editBio: ({newBio}:{newBio:any}) => void;
  getUniqueId: () => string;
  user: any;
  loading: boolean;
  setUser: any;
  toggleLike: (postId: string) => void;
}

const firebaseContext = createContext<FirebaseContextType | null>(null);
const storage = getStorage();

export const useCustomFunction = () => {
  const context = useContext(firebaseContext);
  if (!context) {
    throw new Error('useCustomFunction must be used within a FirebaseProvider');
  }
  return context;
};

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, []);

  
const UploadPost = async ({ title, desc, imageurl }: { title: string; desc: string; imageurl: string }) => {
  try {
    console.log(title, desc, imageurl);

    
    const ImageName = imageurl.substring(imageurl.lastIndexOf('/') + 1);
    const mountainsRef = ref(storage, `postImages/${ImageName + uuidv4()}`);
    const response = await fetch(imageurl);
    const blob = await response.blob();
    const snapsort = await uploadBytes(mountainsRef, blob);
    const downloadURL = await getDownloadURL(mountainsRef);
    console.log(downloadURL);

    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }

    try {
      // Get current user Profile photo
      const imagedb = getDatabase();
      const imageUrlRef = dbRef(imagedb, `UsersProfile/${currentUser.uid}/imageUrl`);
    
      const snapshot = await get(imageUrlRef);
      const userProfileImageurl = await snapshot.val();
      console.log(userProfileImageurl);

      // Save in db
      const newPostRef = push(dbRef(db, 'posts'));
      const timestamp = Date.now();
      
      await set(newPostRef, {
        title,
        desc,
        imageUrl: downloadURL,
        userProfileImageUrl: userProfileImageurl,
        userName: currentUser?.displayName || '', 
        likes: {},  // Initialize an empty likes object
        likeCount: 0,  // Initialize likeCount to 0
        commentCount: 0,  // Initialize commentCount to 0
        lastCommentTimestamp: null,  // Initialize lastCommentTimestamp
        postId: newPostRef.key,
        userId: currentUser.uid,
        createdAt: timestamp,
      });

      // Initialize an empty comments node for this post
      await set(dbRef(db, `comments/${newPostRef.key}`), {});

      console.log('Post uploaded successfully:', downloadURL);
      alert("Post uploaded successfully");

    } catch (error) {
      alert("Something went wrong, please restart the app 1" + error);
    }

  } catch (error) {
    alert("Something went wrong, please restart the app 2" + error);
  }
};

  const getUniqueId = () => {
    const id = uuidv4();
   return id.toString();

  }

  const FetchPosts = () => {
    const postsRef = dbRef(db, 'posts');
    onValue(postsRef, (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        // const postsArray = Object.entries(data).map(([key, value]: [string, any]) => ({
        //   ...value,
        //   postId: key,
        // }));
        // const postsArray = Object.values(data);

        const formattedPosts = Object.entries(data || {}).map(([key, value]: [string, any]) => ({
          postId: key,
          ...value,
          likeCount: typeof value.likeCount === 'object' ? (value.likeCount.xu || 0) : (typeof value.likeCount === 'number' ? value.likeCount : 0),
          commentCount: value.commentCount || 0,
        }));
        setPosts(formattedPosts);
      }
    });
  };
  


  const toggleLike = async (postId: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }
  
    const postRef = dbRef(db, `posts/${postId}`);
    const userLikeRef = dbRef(db, `posts/${postId}/likes/${currentUser.uid}`);
    const likeCountRef = dbRef(db, `posts/${postId}/likeCount`);
  
    try {
      // Get the current like status and likeCount
      const [userLikeSnapshot, likeCountSnapshot] = await Promise.all([
        get(userLikeRef),
        get(likeCountRef)
      ]);
      
      const userLiked = userLikeSnapshot.val();
      const currentLikeCount = likeCountSnapshot.val()?.xu || 0;
  
      if (userLiked) {
        // User already liked, so unlike
        await update(postRef, {
          [`likes/${currentUser.uid}`]: null,
          likeCount: {
            _methodName: "increment",
            xu: Math.max(0, currentLikeCount - 1) // Ensure it doesn't go below 0
          }
        });
      } else {
        // User hasn't liked, so add like
        await update(postRef, {
          [`likes/${currentUser.uid}`]: true,
          likeCount: {
            _methodName: "increment",
            xu: currentLikeCount + 1 
          }
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const UploadProfilePhoto = async ({ imageurl }: { imageurl: any }) => {
    try {
      const ImageName = imageurl.substring(imageurl.lastIndexOf('/') + 1);
      const mountainsRef = ref(storage, `UsersProfilePhoto/${ImageName + uuidv4()}`);
      const response = await fetch(imageurl);
      const blob = await response.blob();
      const snapsort = await uploadBytes(mountainsRef, blob);
      const downloadURL = await getDownloadURL(mountainsRef);
      console.log(downloadURL);
  
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is currently logged in');
      }
  
      // Reference to the 'UsersProfile' node
      const usersProfileRef = dbRef(db, 'UsersProfile');
  
      // Check if a document with the current userId exists
      const snapshot = await get(child(usersProfileRef, currentUser.uid));
  
      if (snapshot.exists()) {
        // Document exists, update the imageUrl
        await update(child(usersProfileRef, currentUser.uid), {
          imageUrl: downloadURL,
          updatedAt: new Date().toISOString(),
        });
  
        console.log('Profile Photo has been successfully updated:', downloadURL);
        alert("Profile Photo updated successfully");
      } else {
        // Document doesn't exist, create a new one
        await set(child(usersProfileRef, currentUser.uid), {
          imageUrl: downloadURL,
          userId: currentUser.uid,
          username: currentUser.displayName,
          email: currentUser.email,
          bio: 'Love to solve Errors',
          skills:'',
          interests:'',
          rating: 0,
          userLocaton: '',
          age:'',
          crush:'',
          postsId: [],
          createdAt: new Date().toISOString(),
        });
  
        console.log('Profile Photo has been successfully uploaded:', downloadURL);
        alert("Profile Photo uploaded successfully");
      }
  
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      alert("Something went wrong, please try again");
    }
  };

  const addSkillInDb = async ({newSkill}:any) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }
  
    try {
      // Reference to the 'UsersProfile' node
      const usersProfileRef = dbRef(db, 'UsersProfile');
  
      // Check if a document with the current userId exists
      const snapshot = await get(child(usersProfileRef, currentUser.uid));
  
      if (snapshot.exists()) {
        // Document exists, update the skills array
        const userData = snapshot.val();
        let updatedSkills = userData.skills || [];
  
        // Check if the skill already exists in the array
        if (!updatedSkills.includes(newSkill)) {
          updatedSkills.push(newSkill);
  
          await update(child(usersProfileRef, currentUser.uid), {
            skills: updatedSkills,
            updatedAt: new Date().toISOString(),
          });
  
          console.log('New Skill has been added successfully', newSkill);
          alert("New Skill has been added successfully");
        } else {
          console.log('Skill already exists');
          alert("This skill already exists in your profile");
        }
      } else {
        // Document doesn't exist, create a new one
        await set(child(usersProfileRef, currentUser.uid), {
          imageUrl: '',
          userId: currentUser.uid,
          username: currentUser.displayName,
          email: currentUser.email,
          bio: 'Love to solve Errors',
          skills: [newSkill],
          interests: [],
          rating: 0,
          userLocation: '',
          age: '',
          crush: '',
          postsId: [],
          createdAt: new Date().toISOString(),
        });
  
        console.log('New Skill has been added successfully', newSkill);
        alert("New Skill has been added successfully");
      }
  
    } catch (error) {
      console.error("Error adding new skill:", error);
      alert("Something went wrong, please try again");
    }
  }


  const addInterestINDb = async ({newInterest}:any) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }
  
    try {
      // Reference to the 'UsersProfile' node
      const usersProfileRef = dbRef(db, 'UsersProfile');
  
      // Check if a document with the current userId exists
      const snapshot = await get(child(usersProfileRef, currentUser.uid));
  
      if (snapshot.exists()) {
        // Document exists, update the Interests array
        const userData = snapshot.val();
        let updatedInterests = userData.interests || [];
  
        // Check if the Interest already exists in the array
        if (!updatedInterests.includes(newInterest)) {
          updatedInterests.push(newInterest);
  
          await update(child(usersProfileRef, currentUser.uid), {
            interests: updatedInterests,
            updatedAt: new Date().toISOString(),
          });
  
          console.log('New Interest has been added successfully', newInterest);
          alert("New Interest has been added successfully");
        } else {
          console.log('Interests already exists');
          alert("This Interest already exists in your profile");
        }
      } else {
        // Document doesn't exist, create a new one
        await set(child(usersProfileRef, currentUser.uid), {
          imageUrl: '',
          userId: currentUser.uid,
          username: currentUser.displayName,
          email: currentUser.email,
          bio: 'Love to solve Errors',
          skills: [],
          interests: [newInterest],
          rating: 0,
          userLocation: '',
          age: '',
          crush: '',
          postsId: [],
          createdAt: new Date().toISOString(),
        });
  
        console.log('New Interest has been added successfully', newInterest);
        alert("New Interest has been added successfully");
      }
  
    } catch (error) {
      console.error("Error adding new Interest:", error);
      alert("Something went wrong, please try again");
    }
  }

  const editBio = async ({newBio}:{newBio:any})=>{
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }
  try {
      // Reference to the 'UsersProfile' node
      const usersProfileRef = dbRef(db, 'UsersProfile');
  
      // Check if a document with the current userId exists
      const snapshot = await get(child(usersProfileRef, currentUser.uid));
  
      if (snapshot.exists()) {
        // Document exists, update the imageUrl
        await update(child(usersProfileRef, currentUser.uid), {
          bio: newBio,
          updatedAt: new Date().toISOString(),
        });
  
        console.log('Profile Photo has been successfully updated:', );
        alert("Bio updated successfully");
  } 
}catch (error:any) {
      console.error("Error adding new Interest:", error);
      alert("Something went wrong, please try again");
}
  
  }



  // =====================================================================Auth context===================
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userJSON = await AsyncStorage.getItem('@user');
        if (userJSON) {
          setUser(JSON.parse(userJSON));
        }
      } catch (error) {
        console.error("Error checking user:", error);
      }

      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          console.log("user is loged in")
          await AsyncStorage.setItem('@user', JSON.stringify(firebaseUser));
        } else {
          setUser(null);
          console.log("user is not logged in");
          await AsyncStorage.removeItem('@user');
        }
        setLoading(false);
      });

      return unsubscribe;
    };

    checkUser();
  },[] );
  return (
    <firebaseContext.Provider value={{ UploadPost,FetchPosts, posts, userInfo, setUserInfo,UploadProfilePhoto,addSkillInDb,addInterestINDb,editBio,getUniqueId,user, setUser, loading,toggleLike }}>
      {children}
    </firebaseContext.Provider>
  );
};
