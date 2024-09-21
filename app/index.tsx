import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Button, Image } from 'react-native';
import Login from '~/components/auth/Login';
import { Platform } from 'react-native';
import { FIREBASE_AUTH} from '../config/firebase';
import * as Google from 'expo-auth-session/providers/google';
import { useStorageContext } from '~/context/StorageContext';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import Head from 'expo-router/head'
import * as WebBrowser from 'expo-web-browser';
import { GoogleLogin } from '@react-oauth/google';




if (Platform.OS !== 'web') {

  WebBrowser.maybeCompleteAuthSession();
}


const Page = () => {
const [open,setOpen] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<any>();
const {email,setEmail}=useStorageContext()
  const clientID = Platform.OS === 'ios' 
  ? process.env.EXPO_PUBLIC_IOS_CLIENT_ID
  : process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

 
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
   clientId: clientID,

  });
const navigation = useNavigation<any>();


  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
     
      signInWithCredential(FIREBASE_AUTH, credential);
     
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user:any) => {
  
      if (user) {
       
        setUserInfo(user);
       const token = user.stsTokenManager?.accessToken
       const displayName = user?.displayName || user.email.split('@')[0];
      const photoURL = user?.photoURL 
      const email = user?.email
      const uid=user?.uid
      if(Platform.OS==='web'){
       localStorage.setItem('token',token)
     localStorage.setItem('displayName',displayName)
       localStorage.setItem('email',email)
      localStorage.setItem('profileImg',photoURL)
       localStorage.setItem('uid',uid)
       setEmail(email)
      }
      await AsyncStorage.setItem('token',token)
      await AsyncStorage.setItem('displayName',displayName)
      await AsyncStorage.setItem('email',email)
    await AsyncStorage.setItem('profileImg',photoURL)
    await AsyncStorage.setItem('uid',uid)
    setEmail(email)
   
      return  ( navigation as any).navigate('home')
      } else {
        setUserInfo(null);
      }
    });
    return () => unsubscribe();
  }, []);






 
  return (
    <>
   <Head>
      <title>My Faith Log</title>
      <meta name="description" content="My Faith Log" />
   </Head>
   <GestureHandlerRootView style={{ flex: 1 }}>
       
       <View style={[styles.container,{backgroundColor:'#E8751A'}]}>
        
         <View style={[styles.loginContainer,{backgroundColor:'#E8751A'}]}>
          <View>
          <View style={{width:40,height:40,borderRadius:100}}/>
           <Text style={[styles.title]}>Faith Log</Text>
           </View>
      


          {Platform.OS==='web'?
          <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />

          : <View style={open?{display:'none'}:{}}>{<Login promptAsync={promptAsync} />}</View>
           }
        
         </View>
     
       </View>
     </GestureHandlerRootView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',

    flexDirection: 'column',
   
    height:'100%'
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFFF',
marginBottom:137,
    flexDirection: 'column',

  },
  
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    color:'#FFFFFF',
  },
  logo:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
  }

});