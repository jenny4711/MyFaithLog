import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'



import Head from 'expo-router/head';

const DataPickerW = () => {
  const [value, onChange] = useState<any>(new Date());

useEffect(()=>{
  console.log(value,'startDate')
},[value])



  return (
    <>
    <Head>
      <title>My Faith Log</title>
      <meta name="description" content="My Faith Log" />
   </Head>
 <View>
  <Text>Calendar</Text>
 </View>
    </>
  )
}

export default DataPickerW