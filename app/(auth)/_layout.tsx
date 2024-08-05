// app/(auth)/_layout.js
import { Stack,Tabs } from 'expo-router';
import { FirebaseProvider } from '../context/techDateContext';
import index from './index';

import { useCustomAuthFunction } from '@/app/context/techDateAuthContext';
export default function _layout() {
  //  const { user, loading } = useCustomAuthFunction();
  return (
    

      <Stack>
          <FirebaseProvider>
        <Stack.Screen 
          // component={Rigister}
         name="techdate"
         options={{headerShown:false}}
      
        />
        </FirebaseProvider>
      </Stack>
 
  );
}