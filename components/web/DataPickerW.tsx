import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Head from 'expo-router/head';
const DataPickerW = () => {
  const [selected, setSelected] = useState<Date>();

useEffect(()=>{
  console.log(selected,'startDate')
},[selected])



  return (
    <>
    <Head>
      <title>My Faith Log</title>
      <meta name="description" content="My Faith Log" />
   </Head>
   <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
    </>
  )
}

export default DataPickerW