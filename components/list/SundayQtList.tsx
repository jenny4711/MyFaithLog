import { View, Text ,Dimensions,TouchableOpacity,Platform} from 'react-native'
import React ,{useState,useEffect}from 'react'
import Animated,{Easing,FadeInLeft} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import Head from 'expo-router/head';

const SundayQtList = ({item,key,move,setMove}:any) => {
  console.log(item,'item')
   const navigation = useNavigation()
   const goToDetail=()=>{
    setMove(true)

    return (navigation as any).navigate('sundayDetail/[date]',{
      date:item.date,
      photo:item.photo,
      content:item.content,
      address:item.address,
      note:item.note,
      title:item.title,
      orgDate:item.date,
      name:item.name
    })
  }
  return (
    <>
       <Head>
         <title>My Faith Log</title>
         <meta name="description" content="My Faith Log" />
      </Head>
       <View key={key} >
         {Platform.OS==='web'?
         <TouchableOpacity key={key} >
   
         <Text style={{fontSize:20,fontFamily:'LineSeedKr-Bd'}}>{item.title}</Text>
             <Text style={{color:'gray',fontFamily:'LineSeedKR-Th'}}>{item.date}</Text>
       
       </TouchableOpacity>
         
         
         
         :
         <TouchableOpacity onPress={goToDetail} >
   
     <Text style={{fontSize:16,fontFamily:"LineSeedKr-Bd"}}>{item.title}</Text>
         <Text style={{color:'gray',opacity:0.9,fontFamily:"LineSeedKr-Th"}}>{item.date}</Text>
   
   </TouchableOpacity>
         
         
         }
   
         
        
       </View>
       </>
  )
}

export default SundayQtList