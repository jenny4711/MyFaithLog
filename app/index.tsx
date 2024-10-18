// import React, { useState, useCallback, useEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, Alert, Button, Image } from 'react-native';
// import Login from '~/components/auth/Login';
// import { Platform } from 'react-native';
// import { FIREBASE_AUTH} from '../config/firebase';
// import * as Google from 'expo-auth-session/providers/google';
// import { useStorageContext } from '~/context/StorageContext';
// import { useNavigation } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
// import Head from 'expo-router/head'
// import * as WebBrowser from 'expo-web-browser';
// import { GoogleLogin } from '@react-oauth/google';




// if (Platform.OS !== 'web') {

//   WebBrowser.maybeCompleteAuthSession();
// }


// const Page = () => {
// const [open,setOpen] = useState<boolean>(false)
//   const [userInfo, setUserInfo] = useState<any>();
// const {email,setEmail}=useStorageContext()
//   const clientID = Platform.OS === 'ios' 
//   ? process.env.EXPO_PUBLIC_IOS_CLIENT_ID
//   : process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

 
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//    clientId: clientID,

//   });
// const navigation = useNavigation<any>();


//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       const credential = GoogleAuthProvider.credential(id_token);
     
//       signInWithCredential(FIREBASE_AUTH, credential);
     
//     }
//   }, [response]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user:any) => {
  
//       if (user) {
       
//         setUserInfo(user);
//        const token = user.stsTokenManager?.accessToken
//        const displayName = user?.displayName || user.email.split('@')[0];
//       const photoURL = user?.photoURL 
//       const email = user?.email
//       const uid=user?.uid
//       if(Platform.OS==='web'){
//        localStorage.setItem('token',token)
//      localStorage.setItem('displayName',displayName)
//        localStorage.setItem('email',email)
//       localStorage.setItem('profileImg',photoURL)
//        localStorage.setItem('uid',uid)
//        setEmail(email)
//       }
//       await AsyncStorage.setItem('token',token)
//       await AsyncStorage.setItem('displayName',displayName)
//       await AsyncStorage.setItem('email',email)
//     await AsyncStorage.setItem('profileImg',photoURL)
//     await AsyncStorage.setItem('uid',uid)
//     setEmail(email)
   
//       return  ( navigation as any).navigate('home')
//       } else {
//         setUserInfo(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);






 
//   return (
//     <>
//    <Head>
//       <title>My Faith Log</title>
//       <meta name="description" content="My Faith Log" />
//    </Head>
//    <GestureHandlerRootView style={{ flex: 1 }}>
       
//        <View style={[styles.container,{backgroundColor:'#E8751A'}]}>
        
//          <View style={[styles.loginContainer,{backgroundColor:'#E8751A'}]}>
//           <View>
//           <View style={{width:40,height:40,borderRadius:100}}/>
//            <Text style={[styles.title]}>Faith Log</Text>
//            </View>
      


//           {Platform.OS==='web'?
//           <View>
//           <GoogleLogin
//           onSuccess={credentialResponse => {
//             console.log(credentialResponse);
//             return  ( navigation as any).navigate('home')
//           }}
//           onError={() => {
//             console.log('Login Failed');
//           }}
          
//         />
// </View>
//           : <View style={open?{display:'none'}:{}}>{<Login promptAsync={promptAsync} />}</View>
//            }
        
//          </View>
     
//        </View>
//      </GestureHandlerRootView>
//     </>
//   );
// };

// export default Page;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor:'white',

//     flexDirection: 'column',
   
//     height:'100%'
//   },
//   loginContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor:'#FFFFFF',
// marginBottom:137,
//     flexDirection: 'column',

//   },
  
 
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 8,
//     color:'#FFFFFF',
//   },
//   logo:{
//     width:'100%',
//     justifyContent:'center',
//     alignItems:'center',
//     flexDirection:'column',
//   }

// });


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform ,Button,Image} from 'react-native';
import Login from '~/components/auth/Login';
import { FIREBASE_AUTH } from '../config/firebase';
import * as Google from 'expo-auth-session/providers/google';
import { useStorageContext } from '~/context/StorageContext';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import Head from 'expo-router/head';
import * as WebBrowser from 'expo-web-browser';
import { GoogleLogin } from '@react-oauth/google'; // 웹에서 사용하는 GoogleLogin

if (Platform.OS !== 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>();
  const { email, setEmail } = useStorageContext();
  const logo = require('../assets/logo.png');
  const clientID =
    Platform.OS === 'ios'
      ? process.env.EXPO_PUBLIC_IOS_CLIENT_ID
      : process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: clientID,
  });
  const navigation = useNavigation<any>();

  // 앱 환경에서 Google 로그인이 성공했을 때 처리
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential).then(async (userCredential) => {
        const user = userCredential.user;

        // 네이티브 환경에서는 AsyncStorage에 사용자 정보 저장
        if (Platform.OS !== 'web') {
          const token = user.stsTokenManager?.accessToken;
          const displayName = user?.displayName || user?.email.split('@')[0];
          const photoURL = user?.photoURL;
          const email = user?.email;
          const uid = user?.uid;

          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('displayName', displayName);
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('profileImg', photoURL);
          await AsyncStorage.setItem('uid', uid);
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
  
    console.log(userInfo, 'userInfo'); // 해독된 사용자 정보 로그
  
    // 웹 환경에서는 localStorage에 사용자 정보 저장
    if (email) {
      localStorage.setItem('token', token);
      localStorage.setItem('displayName', displayName);
      localStorage.setItem('email', email);
      localStorage.setItem('profileImg', photoURL);
      setEmail(email);
    }
  
    // 로그인 후 페이지 이동
    return (navigation as any).navigate('home');
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
          localStorage.setItem('displayName', displayName);
          localStorage.setItem('email', email);
          localStorage.setItem('profileImg', photoURL);
          localStorage.setItem('uid', uid);
          console.log(email, 'email');
          setEmail(email);
        } else {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('displayName', displayName);
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('profileImg', photoURL);
          await AsyncStorage.setItem('uid', uid);
          setEmail(email);
        }
        return (navigation as any).navigate('home');
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
        <View style={[styles.container, { backgroundColor: '#E8751A' }]}>
          <View style={[styles.loginContainer, { backgroundColor: '#E8751A' }]}>
          
            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            
            <Image source={logo} style={{height:100,marginBottom:20}}/>
              <Text style={[styles.title]}>Faith Log</Text>
            </View>

            {Platform.OS === 'web' ? (
              <View>
                <Button title={'TEST BTN'} onPress={()=>(navigation as any).navigate('home')}/>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess} // 웹에서 로그인 성공 시 호출
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </View>
            ) : (
              <View style={open ? { display: 'none' } : {}}>
                <Login promptAsync={promptAsync} />
              </View>
            )}
          </View>
        </View>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
   color:'white',
   fontFamily:'Nunito-Bold'
  },
});

export default Page;