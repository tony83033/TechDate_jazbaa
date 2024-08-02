import {createContext,useContext,useState,useEffect} from 'react'
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {auth} from "../../firebaseConfig"
import {
    GoogleAuthProvider,
    signInWithCredential,
    onAuthStateChanged
  } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseAuthContext = createContext<any | null>(null);
export const useCustomAuthFunction = () => {
    const context = useContext(firebaseAuthContext);
    if (!context) {
      throw new Error('useCustomFunction must be used within a FirebaseProvider');
    }
    return context;
  };

  export const FirebaseAuthProvider = ({ children }: any) => {
    const [userInfo,setUserInfo] = useState("");
    const [loading,setLoading] = useState(false);
    const [request,response,promptAsync] = Google.useAuthRequest({
      androidClientId:"627954942332-f58195qb3bqllgl3auuafjs02vt1ggd1.apps.googleusercontent.com"
    })
    const checkLocalUser = async()=>{
        setLoading(true)
        try{
          const userJSON = await AsyncStorage.getItem('@user')
          const userData = userJSON? JSON.parse(userJSON):null
          console.log("Local storage",userData)
          setUserInfo(userData)
        }catch(e:any){
          alert(e.message)
        }finally{
          setLoading(false)
        }
        
      }
      useEffect(()=>{
        if(response?.type === 'success'){
          const {id_token} = response.params
          const credential = GoogleAuthProvider.credential(id_token)
          signInWithCredential(auth,credential)
        }
      },[response])

      useEffect(()=>{
        checkLocalUser()
        const unsub = onAuthStateChanged(auth, async(user)=>{
          if(user){
            console.log(JSON.stringify(user,null,2))
            setUserInfo(JSON.stringify(user))
            await AsyncStorage.setItem('@user',JSON.stringify(user))
          }else{
            console.log("Not logged in")
            setUserInfo("")
          }
          return () => unsub();
        }) 
      },[])
    return (
        <firebaseAuthContext.Provider value={{ promptAsync,userInfo }}>
          {children}
        </firebaseAuthContext.Provider>
      );
  }