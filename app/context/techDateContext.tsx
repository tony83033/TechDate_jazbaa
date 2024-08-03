import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '@/firebaseConfig';
import { push, set, ref as dbRef, onValue,update, child,get } from 'firebase/database';

interface FirebaseContextType {
  UploadPost: ({ title, desc, imageurl }: { title: string; desc: string; imageurl: string }) => void;
  FetchPosts: () => void;
  posts: any[];
  userInfo: any;
  setUserInfo: any;
  UploadProfilePhoto: ({imageurl}:{imageurl:string}) => void;
  addSkillInDb: ({newSkill}:{newSkill:any}) => void;
  addInterestINDb: ({newInterest}:{newInterest:any}) => void;
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
  return (
    <firebaseContext.Provider value={{ UploadPost, FetchPosts, posts, userInfo, setUserInfo,UploadProfilePhoto,addSkillInDb,addInterestINDb }}>
      {children}
    </firebaseContext.Provider>
  );
};
