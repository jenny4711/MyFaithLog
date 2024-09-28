import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import DatePicker from "react-datepicker";
import Head from 'expo-router/head';
const DataPickerW = () => {
  const [startDate, setStartDate] = useState(new Date());

useEffect(()=>{
  console.log(startDate,'startDate')
},[startDate])



  return (
    <>
    <Head>
      <title>My Faith Log</title>
      <meta name="description" content="My Faith Log" />
   </Head>
         <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)} />
    </>
  )
}

export default DataPickerW