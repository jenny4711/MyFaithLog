import { View, Text,StyleSheet,SafeAreaView ,Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useState,useEffect} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Selection from '~/components/form/Selection';
import { langArr } from '~/utils/selectionArray';
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LogOutSec from '~/components/setting/LogOutSec';
import {deleteAllItem} from '~/utils/fireStoreFn'
const {width,height}=Dimensions.get('window')
const Setting = () => {
  const [lang,setLang]=useState('Kr')
  const navigation = useNavigation()


const handleAllDelete=async()=>{
  await deleteAllItem()
  console.log('deleteAllItem')
  return (navigation as any).replace('home')
}





  useEffect(()=>{
    const getLang=async()=>{
   
      if(lang){
        await AsyncStorage.setItem('lang',lang)
      }
    }
    getLang()
  },[lang])
  return (
    <SafeAreaView style={{alignItems:'center',backgroundColor:'#E8751A',height:height}}>
<View style={{width:width-48}}>
  <TouchableOpacity  onPress={()=>navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color="black"/>
  </TouchableOpacity>
</View>

<View style={{justifyContent:'center',alignItems:'center',marginVertical:16}}>
  <Text style={{fontSize:16,fontFamily:'LineSeedKr-Bd',color:'white'}}>Setting</Text>
</View>
<View style={{width:width-48}}>
  <Text style={{fontSize:14,fontFamily:'LineSeedKr-Bd',color:'white'}}>Account</Text>
  <View>
<LogOutSec/>
  </View>
  <View>
    <TouchableOpacity onPress={handleAllDelete} activeOpacity={1}  style={{justifyContent:'center',alignItems:'center',paddingVertical:24,width:width-48,backgroundColor:'#ffffff',borderRadius:24,marginTop:16}} >
      <Text>모든 데이터 삭제</Text>
    </TouchableOpacity>
  </View>
</View>


<View style={{width:width-48,marginVertical:16}}>
<Text style={{fontSize:14,fontFamily:'LineSeedKr-Bd',color:'white'}}>Style</Text>
<View>
 
</View>

</View>

   
    </SafeAreaView>
  )
}

export default Setting




{/* <View style={{flex:1, backgroundColor:'#E8751A'}}>
<Selection arr={langArr} setChange={setLang} placeHolder={<MaterialIcons name="language" size={24} color="black" />} btnWidth={width-360}/>

</View> */}