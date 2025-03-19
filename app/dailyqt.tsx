import { View, Text ,Dimensions,SafeAreaView, StyleSheet,TouchableOpacity,Platform,Image} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useData } from '~/hooks/useFormData';
import DailyQtList from '~/components/list/DailyQtList';
import Animated, { Easing, FadeInLeft } from 'react-native-reanimated';
import Head from 'expo-router/head';
import { useRouter } from 'expo-router';
import ListFirstView from '~/components/list/ListFirstView';
import MenuList from '~/components/home/MenuList';

import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from 'expo-router';
import { useStorageContext } from '~/context/StorageContext';
const { width } = Dimensions.get('window');

const DailyQt = () => {
  const {setCategory,category}=useStorageContext()
  useEffect(()=>{
    setCategory("dailyqt")
      },[])
 


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#D7A31F',alignItems:'center'}}>

     <MenuList address={"dailyListPg"}/>
    </SafeAreaView>
  );
};

export default DailyQt;

const styles=StyleSheet.create({
  btn:{
    width:60,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:100,


  },
})
