import { View, Text,StyleSheet,SafeAreaView ,Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useState,useEffect} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Selection from '~/components/form/Selection';
import { langArr } from '~/utils/selectionArray';
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width,height}=Dimensions.get('window')
const Setting = () => {
  const [lang,setLang]=useState('Kr')
  const navigation = useNavigation()
  useEffect(()=>{
    const getLang=async()=>{
   
      if(lang){
        await AsyncStorage.setItem('lang',lang)
      }
    }
    getLang()
  },[lang])
  return (
    <SafeAreaView style={{backgroundColor:'#E8751A',height:height}}>
<View>
  <TouchableOpacity onPress={()=>navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color="black"/>
  </TouchableOpacity>
</View>

    <View style={{flex:1, backgroundColor:'#E8751A'}}>
    <Selection arr={langArr} setChange={setLang} placeHolder={<MaterialIcons name="language" size={24} color="black" />} btnWidth={width-360}/>

    </View>
    </SafeAreaView>
  )
}

export default Setting