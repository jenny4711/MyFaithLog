import { View, Text ,Dimensions,TouchableOpacity} from 'react-native'
import React ,{useState,useEffect}from 'react'
import Animated,{Easing,FadeInLeft} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useStorageContext } from '~/context/StorageContext'
const SundayListItem = ({item}:any) => {
  const [date,setDate]=useState('')
const navigation = useNavigation()
const {setImg}=useStorageContext()
useEffect(()=>{
  const isoDate = item.date
  const year = isoDate.split('-')[2]
  const month = isoDate.split('-')[0]
  const day = isoDate.split('-')[1]
  const fullDate = `${month}/${day}/${year}`

 
  setDate(fullDate)
},[item.date])
const goToDetail=()=>{
  setImg(item.photo)
  return (navigation as any).navigate('sundayDetail/[date]',{
  date:date,
 content:item.content,
  title:item.title,
  photo:item.photo,
  orgDate:item.date,
  note:item.note
})
}

console.log(item.photo,'photo')



  return (
    <View >
    <TouchableOpacity onPress={goToDetail}>
    <Text style={{fontSize:16,fontWeight:600}}>{item.title}</Text>
          <Text style={{color:'gray',opacity:0.9}}>{date}</Text>
    
    </TouchableOpacity>
          
         
        </View>
  )
}

export default SundayListItem