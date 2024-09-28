import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import { dayList,monthList,yearList } from '~/utils/selectionArray';
import Select from 'react-select';

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
  <View style={{display:'flex',gap:10}} >
    <Select
      options={dayList}
      onChange={onChange}
      value={value}
    />
  </View>
 </View>
    </>
  )
}

export default DataPickerW