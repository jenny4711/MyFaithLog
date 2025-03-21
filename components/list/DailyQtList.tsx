import { View, Text ,Dimensions,TouchableOpacity,Platform} from 'react-native'
import React ,{useState,useEffect}from 'react'
import Animated,{Easing,FadeInLeft} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import Head from 'expo-router/head';
const {width,height} = Dimensions.get('window')
const DailyQtList = ({item,key,move,setMove}:any) => {
  const navigation = useNavigation()
const [date,setDate]=useState('')
console.log(item,'item.....ddddddd')
useEffect(()=>{
  // const isoDate = item.date
  // const year = isoDate.split('-')[2]
  // const month = isoDate.split('-')[0]
  // const day = isoDate.split('-')[1]
  // const fullDate = `${month}.${day}.${year}`


  // setDate(fullDate)
},[item.date])
  

const goToDetail=()=>{
  setMove(true)

  return (navigation as any).navigate('dailyqtDetail/[date]',{
    date:item.date,
    meditation:item.meditation,
    pray:item.pray,
    application:item.application,
    content:item.content,
    address:item.address,
    title:item.title,
    orgDate:item.date,
    name:item.name,
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

export default DailyQtList
