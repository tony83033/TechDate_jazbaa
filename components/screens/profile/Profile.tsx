import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions,Modal,TextInput } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { setPriority } from "firebase/database";
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { useCustomFunction } from '@/app/context/techDateContext';
import { getDatabase, ref, onValue } from "firebase/database";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Padding } from "@/GlobalStyles";
const skills = ["MERN App", "Docker", "React Native", "AWS", "Azure", "Kubernetes"];
const interests = ["Coding", "Problem Solving", "Technology", "Innovation", "Web Development"];


const ProfileHeader = ({ userInfo, onSignOut }:any) => {
  const [profileModal,setProfileModal] = useState<boolean>(false)
  const [profileUri,setProfileUri] = useState<any>('')
  const [imageUrl, setImageUrl] = useState('');
  const [bio, setBio] = useState('');
  const [bioModal,setBioModal] = useState<boolean>(false)
  const [newBio,setNewBio] = useState<any>('')
  const allFunctions  = useCustomFunction()
  console.log("Insider Upload")
  console.log(allFunctions)
  const {UploadProfilePhoto,editBio} = allFunctions;

  const ProfilePhotoSchema = Yup.object().shape({
    photo: Yup.string().required('A photo is required'),
  });

  useEffect(() => {
    if (userInfo) {
      fetchImageUrl();
      fetchBio();
    }
  }, [userInfo]);
  const fetchImageUrl = () => {
    const db = getDatabase();
    const imageUrlRef = ref(db, `UsersProfile/${userInfo.uid}/imageUrl`);
    
    onValue(imageUrlRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setImageUrl(data);
      } else {
        setImageUrl('');
      }
    });
  };

  const fetchBio = () => {
    const db = getDatabase();
    const bio = ref(db, `UsersProfile/${userInfo.uid}/bio`);
    
    onValue(bio, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBio(data);
      } else {
        setBio('');
      }
    });
  };


  const pickImage = async (setFieldValue: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setFieldValue('photo', result.assets[0].uri);
      setProfileUri(result.assets[0].uri)
      console.log(result.assets[0].uri)
      console.log('Photo',profileUri)
    }
  };

  
  const handleAddPhoto = () => {
    // Implement add interest functionality
    console.log("Add interest pressed");
    setProfileModal(true)
  
  };

  // upload to firestor
  
  return (
  
  <View style={styles.profileHeader}>
    <TouchableOpacity onPress={()=>handleAddPhoto()}>
    <Image
          style={styles.profileImage}
          contentFit="cover"
          source={imageUrl ? { uri: imageUrl } : require("../../../assets/userIcon.png")}
        />
    </TouchableOpacity>
    <Text style={styles.userName}>{userInfo?.displayName || "User"}</Text>
    <TouchableOpacity onPress={() => setBioModal(true)}>
    <Text style={styles.userBio}>{bio}   <MaterialIcons name="edit" size={24} color="black" /> </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.signOutButton} onPress={onSignOut}>
      <Text style={styles.signOutText}>Log Out</Text>
    </TouchableOpacity>
    {/* start Bio modal */}
    <Modal
  animationType="slide"
  transparent={true}
  visible={bioModal}
  onRequestClose={() => setBioModal(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setBioModal(false)}
      >
        {/* <Ionicons name="close" size={24} color="red" /> */}
        <AntDesign name="closecircle" size={24} color="#E84342" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Add New Bio</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewBio}
        value={newBio}
        placeholder="Enter new Bio"
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // Add the new skill to the skills array
          // This is where you'd typically update your backend or state management
          console.log('New skill added:', newBio);
          setNewBio('');
          setBioModal(false);
          editBio({newBio})
        }}
      >
        <Text style={styles.addButtonText}>Add Bio</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    {/* End Bio madal */}

  {/* Start ProfilePhoto modal */}
  <Modal
  animationType="slide"
  transparent={true}
  visible={profileModal}
  onRequestClose={() => setProfileModal(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setProfileModal(false)}
      >
        <AntDesign name="closecircle" size={24} color="#E84342" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Add New Profile Photo</Text>
      <Formik
        initialValues={{ photo: '' }}
        validationSchema={ProfilePhotoSchema}
        onSubmit={(values) => {
          // console.log('New profile photo added:', values.photo);
          UploadProfilePhoto({imageurl:values.photo});
          // Here you would typically update your backend or state management
          setProfileModal(false);
        }}
      >
        {({ handleSubmit, values, setFieldValue, errors }) => (
          <View>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage(setFieldValue)}
            >
              {values.photo ? (
                <Image 
                  source={{ uri: values.photo }} 
                  style={styles.previewImage} 
                />
              ) : (
                <Text>Select a photo</Text>
              )}
            </TouchableOpacity>
            {errors.photo && <Text style={styles.errorText}>{errors.photo}</Text>}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.addButtonText}>Update Profile Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  </View>
</Modal>
  {/* End ProfilePhoto modal */}
  </View>
  )
};

const Section = ({ title, children, onAddPress }:any) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onAddPress}>
        <Ionicons name="add-circle-outline" size={30} color="green" />
      </TouchableOpacity>
    </View>
    {children}
  </View>
);

const SkillsList = ({ skills }:any) => (
  <View style={styles.skillsList}>
  {skills.length > 0 ? (
    skills.map((skill:any, index:any) => (
      <View key={index} style={styles.skillItem}>
        <Text style={styles.skillText}>{skill}</Text>
      </View>
    ))
  ) : (
    <Text>No skills added yet</Text>
  )}
</View>
);

const InterestsList = ({ interests }:any) => (
  <View style={styles.interestsList}>
    {interests.length >0 ? (
      interests.map((interest:any, index:any) => (
        <View key={index} style={styles.interestItem}>
          <Text style={styles.interestText}>{interest}</Text>
        </View>
      ))
    ):(
      <Text>No interests added yet</Text>
    )}
    
  </View>
);

const Profile = () => {
  const [userInfo, setUserInfo] = useState<any>();
  const [skillModal,setSkillModal] = useState<boolean>(false)
  const [interestModal,setInterestModal] = useState<boolean>(false)
  const [newSkill, setNewSkill] = useState<string>('');
  const [newInterest, setNewInterest] = useState<string>('');
  
  const [profileModal,setProfileModal] = useState<boolean>(false)
  const [profileUri,setProfileUri] = useState<any>('')

  const [skills, setSkills] = useState<any>([]);
  const [interests, setInterests] = useState<any>([]);


  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userInfo) {
      fetchSkills();
      fetchInterests();
    }
  }, [userInfo]);

  const fetchSkills = () => {
    const db = getDatabase();
    const skillsRef = ref(db, 'UsersProfile/' + userInfo.uid + '/skills');
    
    onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const skillsArray = Object.values(data);
        setSkills(skillsArray);
      } else {
        setSkills([]);
      }
    });
  };

  const fetchInterests = () => {
    const db = getDatabase();
    const skillsRef = ref(db, 'UsersProfile/' + userInfo.uid + '/interests');
    
    onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const interestsArray = Object.values(data);
        setInterests(interestsArray);
      } else {
        setInterests([]);
      }
    });
  };

  const getCurrentUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserInfo(user);
      console.log("Profile",user);
    } else {
      console.log("Not logged in");
    }
  };

  const userSignOut = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.setItem('@user', "");
      console.log("User signed out successfully");
      router.push("/(auth)");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAddSkill = () => {
    // Implement add skill functionality
    console.log("Add skill pressed");
    setSkillModal(true)
  };

  const handleAddInterest = () => {
    // Implement add interest functionality
    console.log("Add interest pressed");
    setInterestModal(true)
  
  };


  const allFunctions  = useCustomFunction()
  console.log("Insider Upload")
  console.log(allFunctions)
  const {addSkillInDb,addInterestINDb} = allFunctions;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader userInfo={userInfo} onSignOut={userSignOut} />
        <Section title="Skills" onAddPress={handleAddSkill}>
          <SkillsList skills={skills} />
         {/* Start Modal skill */}
         <Modal
  animationType="slide"
  transparent={true}
  visible={skillModal}
  onRequestClose={() => setSkillModal(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setSkillModal(false)}
      >
        {/* <Ionicons name="close" size={24} color="red" /> */}
        <AntDesign name="closecircle" size={24} color="#E84342" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Add New Skill</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewSkill}
        value={newSkill}
        placeholder="Enter new skill"
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // Add the new skill to the skills array
          // This is where you'd typically update your backend or state management
          console.log('New skill added:', newSkill);
          setNewSkill('');
          setSkillModal(false);
          addSkillInDb({newSkill})
        }}
      >
        <Text style={styles.addButtonText}>Add Skill</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
{/* End Modal skill */}
        </Section>
        <Section title="Interests" onAddPress={handleAddInterest}>
          <InterestsList interests={interests} />
          {/* Start Modal interest */}
          <Modal
  animationType="slide"
  transparent={true}
  visible={interestModal}
  onRequestClose={() => setInterestModal(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setInterestModal(false)}
      >
        {/* <Ionicons name="close" size={24} color="red" /> */}
        <AntDesign name="closecircle" size={24} color="#E84342" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Add New Interest</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewInterest}
        value={newInterest}
        placeholder="Enter new Interest"
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // Add the new skill to the Interest array
          // This is where you'd typically update your backend or state management
          console.log('New skill added:', newInterest);
          setNewInterest('')
          setInterestModal(false);
          addInterestINDb({newInterest})
        }}
      >
        <Text style={styles.addButtonText}>Add Interest</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
          {/* End Modal interest */}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e6fa",
    height: Dimensions.get("window").height,
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e6e6fa",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userBio: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  signOutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signOutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    margin: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    padding: 20,
  },
  skillText: {
    color: "black",
    fontSize: 14,
  },
  interestsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestItem: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    padding: 20,
  },
  interestText: {
    color: "black",
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    elevation: 2,
    
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  imagePicker: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Profile;