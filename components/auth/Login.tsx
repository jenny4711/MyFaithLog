import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform ,Button,Image,Dimensions} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { FIREBASE_AUTH } from '~/config/firebase';
import * as Google from 'expo-auth-session/providers/google';
import { useStorageContext } from '~/context/StorageContext';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import Head from 'expo-router/head';
import * as WebBrowser from 'expo-web-browser';
import { GoogleLogin } from '@react-oauth/google'; // 웹에서 사용하는 GoogleLogin
import AppleLogin from '~/components/auth/AppleLogin';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { GoogleIcon } from '~/utils/Icons';
const {width,height}=Dimensions.get('window')

if(Platform.OS !== 'web'){
  WebBrowser.maybeCompleteAuthSession();
}
const Login = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>();
  const { email, setEmail } = useStorageContext();

  const clientID =
    Platform.OS === 'ios'
      ? process.env.EXPO_PUBLIC_IOS_CLIENT_ID
      : process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  //   androidClientId:process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  //   clientId:process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  //   // redirectUri: Platform.OS === 'web' ? window.location.origin : undefined,
  // });




      
            const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
              iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
              androidClientId:process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
              clientId:process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
              redirectUri: Platform.OS === 'web' ? window.location.origin : undefined,
            });
  const navigation = useNavigation<any>();



  

  // 앱 환경에서 Google 로그인이 성공했을 때 처리
  useEffect(() => {
    console.log(response,'response@@@@@@@')
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential).then(async (userCredential) => {
        const user:any = userCredential.user;

        // 네이티브 환경에서는 AsyncStorage에 사용자 정보 저장
        if (Platform.OS !== 'web') {
          const token = user.stsTokenManager?.accessToken;
          
          const email = user?.email  ;
        
          await AsyncStorage.setItem('token', token);
          // await AsyncStorage.setItem('displayName', displayName);
          await AsyncStorage.setItem('email', email);
      
        
          setEmail(email);
        }
      });
    }
  }, [response]);

  // 웹 환경에서 Google 로그인 성공 시 처리
  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    console.log(credentialResponse, 'credentialResponse'); // 전체 응답 내용을 확인
    
    // 만약 profileObj가 제대로 반환되지 않는다면, id_token을 해독해 사용자 정보를 추출해야 할 수 있습니다.
    const { credential } = credentialResponse;
    const token = credentialResponse.credential;
  
    // id_token을 해독하여 사용자 정보 추출
    const userInfo = parseJwt(token);

    // 추출된 사용자 정보
    const email = userInfo?.email;
    const displayName = userInfo?.name;
    const photoURL = userInfo?.picture;
  

  
    // 웹 환경에서는 localStorage에 사용자 정보 저장
    if (email) {
      localStorage.setItem('token', token);
      localStorage.setItem('displayName', displayName);
      localStorage.setItem('email', email);
      localStorage.setItem('profileImg', photoURL);
      setEmail(email);
    }
  
    // 로그인 후 페이지 이동
    // return (navigation as any).navigate('home');
  };
  
  // JWT를 해독하는 함수 (id_token을 해독하여 사용자 정보 추출)
  function parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.log('Error decoding token', error);
      return null;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user: any) => {
      if (user) {
        setUserInfo(user);
        const token = user.stsTokenManager?.accessToken;
        const displayName = user?.displayName || user.email.split('@')[0];
        const photoURL = user?.photoURL;
        const email = user?.email;
        const uid = user?.uid;

        // 웹과 네이티브 분기
        if (Platform.OS === 'web') {
          localStorage.setItem('token', token);

          localStorage.setItem('email', email);
   
          console.log(email, 'email');
          setEmail(email);
        } else {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('email', email);
       
        
          setEmail(email);
        }
        // return (navigation as any).navigate('home');
      } else {
        setUserInfo(null);
      }
    });
    return () => unsubscribe();
  }, []);


  return (
    <>
   
    <View style={{justifyContent:'center',alignItems:'center',paddingVertical:24,width:width/1.5,backgroundColor:'#ffffff',borderRadius:24,marginTop:16}}>
      <TouchableOpacity style={[styles.googleBtn]} onPress={()=>promptAsync()}>
        <GoogleIcon size={24}/>
      <Text style={{ color: '#000000',fontWeight:700,marginLeft:10,fontSize:16}}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  googleBtn: { 
    marginTop:6,
   
    width:200,
    // height: 60,
    borderRadius: 24, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight:16,
  }
})