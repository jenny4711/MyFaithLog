import { View, Text ,Dimensions,TouchableOpacity} from 'react-native'
import React ,{useState,useEffect}from 'react'
import Animated,{Easing,FadeInLeft} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
const {width,height} = Dimensions.get('window')
const DailyQtList = ({item,key}:any) => {
  const navigation = useNavigation()
const [date,setDate]=useState('')

useEffect(()=>{
  const isoDate = item.date
  const year = isoDate.split('-')[2]
  const month = isoDate.split('-')[0]
  const day = isoDate.split('-')[1]
  const fullDate = `${month}.${day}.${year}`

 console.log(item.date)
  setDate(fullDate)
},[item.date])
  

const goToDetail=()=>{
 

  (navigation as any).navigate('dailyqtDetail/[date]',{
    date:date,
    meditation:item.meditation,
    pray:item.pray,
    application:item.application,
    content:item.content,
    address:item.address,
    title:item.title,
    orgDate:item.date
  })
}

  return (
    <View >
<TouchableOpacity onPress={goToDetail}>
<Text style={{fontSize:16,fontFamily:"LineSeedKr-Bd"}}>{item.title}</Text>
      <Text style={{color:'gray',opacity:0.9,fontFamily:"LineSeedKr-Th"}}>{date}</Text>

</TouchableOpacity>
      
     
    </View>
  )
}

export default DailyQtList
