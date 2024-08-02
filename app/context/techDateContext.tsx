import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '@/firebaseConfig';
import { push, set, ref as dbRef, onValue } from 'firebase/database';

interface FirebaseContextType {
  UploadPost: ({ title, desc, imageurl }: { title: string; desc: string; imageurl: string }) => void;
  FetchPosts: () => void;
  posts: any[];
  userInfo: any;
  setUserInfo: any;
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
        const newPostRef = push(dbRef(db, 'posts'));
        await set(newPostRef, {
          title,
          desc,
          imageUrl: downloadURL,
          likeCount: 0,
          commentCount: 0,
          userId: currentUser.uid,
          createdAt: new Date().toISOString(),
        });

        console.log('Post uploaded successfully:', downloadURL);
        alert("Post uploaded successfully");

      } catch (error) {
        alert("Something went wrong, please restart the app");
      }

    } catch (error) {
      alert("Something went wrong, please restart the app");
    }
  };

  const FetchPosts = () => {
    const postsRef = dbRef(db, 'posts');
    onValue(postsRef, (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.values(data);
        setPosts(postsArray);
      }
    });
  };

  return (
    <firebaseContext.Provider value={{ UploadPost, FetchPosts, posts, userInfo, setUserInfo }}>
      {children}
    </firebaseContext.Provider>
  );
};
