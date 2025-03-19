import { View, Text,StyleSheet,SafeAreaView ,Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useState,useEffect} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Selection from '~/components/form/Selection';
import { langArr } from '~/utils/selectionArray';
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStorageContext } from '~/context/StorageContext';
import LogOutSec from '~/components/setting/LogOutSec';
import {deleteAllItem} from '~/utils/fireStoreFn'
import Login from '~/components/auth/Login';
import AppleLogin from '~/components/auth/AppleLogin';
import { clearAllData } from '~/utils/localStorageFn';
const {width,height}=Dimensions.get('window')
const Setting = () => {
  const [lang,setLang]=useState('Kr')
  const navigation = useNavigation()
const {email}=useStorageContext()

const handleAllDelete=async()=>{
  await clearAllData()
  console.log('deleteAllItem')
  return (navigation as any).replace('home')
}




useEffect(()=>{console.log(email,'email')},[email])
  useEffect(()=>{
    const getLang=async()=>{
   
      if(lang){
        await AsyncStorage.setItem('lang',lang)
      }
    }
    getLang()
  },[lang])
  return (
    <SafeAreaView style={{alignItems:'center',backgroundColor:'#D7A31F',height:height}}>
<View style={{width:width-48}}>
  <TouchableOpacity  onPress={()=>navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color="black"/>
  </TouchableOpacity>
</View>

<View style={{justifyContent:'center',alignItems:'center',marginVertical:16}}>
  <Text style={{fontSize:24,fontFamily:'LineSeedKr-Bd',color:'white'}}>Setting</Text>
</View>
<View style={{width:width-48,}}>
  <Text style={{fontSize:20,fontFamily:'LineSeedKr-Bd',color:'white'}}>Account</Text>
  <View style={{alignItems:'center'}}>
    
    {email !== "" &&  <LogOutSec/>}
      

   {email === "" && <Login/>}
    {email === "" &&  <AppleLogin/>}
    
   

  </View>
  <View style={{alignItems:'center'}}>
    <TouchableOpacity onPress={handleAllDelete} activeOpacity={1}  style={{justifyContent:'center',alignItems:'center',paddingVertical:24,width:width/1.5,backgroundColor:'#ffffff',borderRadius:24,marginTop:16}} >
      <Text>모든 데이터 삭제</Text>
    </TouchableOpacity>
  </View>
</View>


{/* <View style={{width:width-48,marginVertical:16}}>
<Text style={{fontSize:20,fontFamily:'LineSeedKr-Bd',color:'white'}}>Style</Text>
<View>
 
</View>

</View> */}

   
    </SafeAreaView>
  )
}

export default Setting




{/* <View style={{flex:1, backgroundColor:'#E8751A'}}>
<Selection arr={langArr} setChange={setLang} placeHolder={<MaterialIcons name="language" size={24} color="black" />} btnWidth={width-360}/>

</View> */}