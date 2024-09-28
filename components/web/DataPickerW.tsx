import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar';
// import { DayPicker } from "react-day-picker";

import Head from 'expo-router/head';

const DataPickerW = () => {
  const [value, onChange] = useState<any>(new Date());

useEffect(()=>{
  console.log(value,'startDate')
},[value])

function formatDate (date:Date, formatStr:string){
  console.log(date,formatStr,'date')
 
}

  return (
    <>
    <Head>
      <title>My Faith Log</title>
      <meta name="description" content="My Faith Log" />
   </Head>
   <Calendar onChange={onChange} value={value} formatMonthYear={(locale, date) => formatDate(date, 'MMMM YYYY')}  />
    </>
  )
}

export default DataPickerW