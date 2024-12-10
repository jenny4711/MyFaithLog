
import React,{useState,useEffect} from 'react';
import {Dimensions, View, Text,Image,TouchableOpacity ,StyleSheet,Alert} from 'react-native'
import { FIREBASE_AUTH } from '~/config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigation ,useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height}=Dimensions.get('window')

const LogOutSec=()=>{
  const [userEmail,setUserEmail]=useState<string>('') 
  const navigation=useNavigation()
  useEffect(()=>{
    const getUsesrEmail=async()=>{
      const getEmail=await AsyncStorage.getItem('email')
      const [localPart,domain]:any=getEmail?.split('@')
      if(localPart.length <=2){
        return setUserEmail(getEmail ||'')
        }
        return setUserEmail(`${localPart.slice(0,2)}...@${domain}`)

    }
    getUsesrEmail()
  },[])

const handleLogOut=async()=>{
  try{
    Alert.alert('로그아웃','로그아웃을 하시겠습니까?',[
      {
        text:'취소',
        onPress:()=>console.log('cancel')
      },
      {text:'로그아웃',style:'destructive',onPress:async()=>{
        await signOut(FIREBASE_AUTH)
        AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('email').then(()=>{
          (navigation as any).replace('index')
        }).catch((error)=>{
          console.log(error)
        })
     
      }}
    ])
  }catch(error){
    console.log(error)
  }
}




  return(
    <TouchableOpacity activeOpacity={1} onPress={handleLogOut} style={{justifyContent:'center',alignItems:'center',paddingVertical:24,width:width-48,backgroundColor:'#ffffff',borderRadius:24,marginTop:16}}>
    <Text style={[styles.TextStyle,{color:'black'}]}>로그 아웃 </Text>
  </TouchableOpacity>
  )


}
const styles=StyleSheet.create({
  container: {
  
    flexDirection:'row',
    width:width-48,
    justifyContent:"space-between",
    alignItems:'center',
    paddingHorizontal:14,
    borderRadius:5,
    height:70,
    borderBottomWidth:0.2,
    borderBottomColor:'gray',
  


  },
  profile:{
   
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  btn:{
    backgroundColor:'black',
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:100,
    height:40,
    width:68,
    // marginRight:18
   
   
  },
  TextStyle: {
    fontSize:16,
    fontFamily:"SFCompactRoundedBD",
    lineHeight:19.09
  }

})
export default LogOutSec