import { View, Text ,Dimensions,SafeAreaView, StyleSheet,TouchableOpacity,Platform,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import MenuList from '~/components/home/MenuList'
import Animated,{Easing,FadeInLeft} from 'react-native-reanimated'
import SundayListItem from '~/components/list/SundayListItem'
import ListFirstView from '~/components/list/ListFirstView'
import { useStorageContext } from '~/context/StorageContext';
const {width} = Dimensions.get('window')

const Sunday = () => {
  
   const {setCategory,category}=useStorageContext()
    useEffect(()=>{
      setCategory('sundayQt')
        },[])


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#D7A31F',alignItems:'center'}}>

    <MenuList address={"sundayListPg"}/>
   </SafeAreaView>
  )
}

export default Sunday
const styles=StyleSheet.create({
  itemView:{
    backgroundColor:'white',
    width:width-48,
    marginVertical:8,
    paddingHorizontal:10,
    paddingVertical:10
    ,borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  }
})