import { View, Text ,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import React, { useState, useEffect } from 'react';
import { OAuthProvider } from 'firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import  {jwtDecode} from 'jwt-decode'
import {FIREBASE_AUTH} from '../../config/firebase'
import { signInWithCredential } from 'firebase/auth';
import { useNavigation } from 'expo-router';
import { AppleIcon } from '~/utils/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window')
const AppleLogin = () => {
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [userToken, setUserToken] = useState(null);

const navigation=useNavigation()
  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };
    checkAvailable();
  }, []);

  const login = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
  
      const { identityToken, email, fullName } = credential;
      if (typeof identityToken === 'string') {
        const decodedToken = jwtDecode(identityToken);
        const { email, email_verified, sub }:any = decodedToken;
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('token',identityToken)
        console.log(email, 'email');

        const current = Date.now() / 1000;
       
      } else {
        console.log('Invalid token format');
        return <Text>Invalid token format</Text>;
      }
  
      if (!email) {
        // 이메일이 제공되지 않았을 때의 대체 로직
        console.log('Apple에서 이메일을 제공하지 않았습니다. 사용자에게 이메일을 요청합니다...');
        // 사용자에게 이메일을 요청하는 화면으로 이동하거나 입력하게끔 처리
      }
  
      if (identityToken) {
        const provider = new OAuthProvider('apple.com');
        const firebaseCredential = provider.credential({
          idToken: identityToken,
        });
        await signInWithCredential(FIREBASE_AUTH, firebaseCredential);
        // 로그인 성공 후 home으로 이동
       ( navigation as any).navigate('home');
      }
    } catch (error) {
      console.log(error, 'errorAppleLogin');
    }
  };
  

  // const login = async () => {
  //   try {
  //     const credential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //       ],
  //     });

  //     const { identityToken, email, fullName }:any= credential;
  //     setUserToken(identityToken);
  //    console.log(email,'email')
  //     console.log(fullName,'fullName')
  //     console.log(identityToken,'identity token')
  //     if (identityToken) {
  //       const provider = new OAuthProvider('apple.com');
  //       const firebaseCredential = provider.credential({
  //         idToken: identityToken,
  //       });
  //       await signInWithCredential(FIREBASE_AUTH, firebaseCredential);
  //     }
  //   } catch (error) {
  //     console.log(error, 'errorAppleLogin');
  //   }
  // };

  const getAppleAuthContent = () => {
    try {
      if (!userToken) {
        return (
          
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={50}
            style={styles.btn}
            onPress={login}
            
            
          />
        );
      } else {
        // userToken이 문자열인지 확인
        if (typeof userToken === 'string') {
          const decodedToken = jwtDecode(userToken);
          console.log(decodedToken, 'decodedToken');

          const current = Date.now() / 1000;
         
        } else {
          console.log('Invalid token format');
          return <Text>Invalid token format</Text>;
        }
      }
    } catch (error) {
      console.log(error, 'errorAppleLogin');
    }
  };





  return (
    <View style={{justifyContent:'center',alignItems:'center',paddingVertical:24,width:width/1.5,backgroundColor:'#ffffff',borderRadius:24,marginTop:16}}>
    {appleAuthAvailable ? (
      // 커스텀 버튼을 사용하여 Apple 로그인 처리
      <TouchableOpacity style={[styles.btn]} onPress={()=>login()}>
        <AppleIcon size={24} color={'black'}/>
        <Text style={[styles.customButtonText,{fontFamily:"SFCompactRoundedBD",color:'#000000',fontSize:16,marginLeft:8}]}>Sign in with Apple</Text>
      </TouchableOpacity>
    ) : (
      <Text>Apple Login is not available</Text>
    )}
  </View>
  )
}

export default AppleLogin


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop:6,
  
    borderRadius: 24, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  fontSize:16,
      width:345,
    // height: 70,
    marginRight:25
   
  },
  customButtonText: {
    color: 'white',
    fontSize: 16, // 글꼴 크기 조정
    fontWeight: 'bold',
    marginLeft:2.5
  },
});
