import { View, Text ,ScrollView,Dimensions,StyleSheet,Platform} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useData } from '~/hooks/useFormData'
import DailyQtList from '~/components/list/DailyQtList'
import Animated,{Easing,FadeInLeft} from 'react-native-reanimated'
import Head from 'expo-router/head';
const {width} = Dimensions.get('window')
const DailyQt = () => {
  const [category,setCategory]=useState('dailyQt')
  const [formData,setFormData]=useState([])
const {data}=useData(category)

useEffect(() => {
  if (data) {
    const sortedList:any = data.sort((a, b) => {
      // 날짜를 dd/mm/yyyy 형식에서 각각 분리
      const [dayA, monthA, yearA] = a.date.split('-');
      const [dayB, monthB, yearB] = b.date.split('-');

      // 연도 비교
      if (yearA !== yearB) {
        return parseInt(yearB) - parseInt(yearA); // 큰 연도가 위로
      }

      // 월 비교
      if (monthA !== monthB) {
        return parseInt(monthB) - parseInt(monthA); // 큰 월이 위로
      }

      // 일 비교
      return parseInt(dayB) - parseInt(dayA); // 큰 일이 위로
    });

    // 데이터가 달라졌을 경우만 상태 업데이트
    if (JSON.stringify(sortedList) !== JSON.stringify(formData)) {
      setFormData(sortedList);
    }
  }
}, [data]);




  return (
    <>
    <Head>
      <title>My Faith Log</title>
      <meta name="description" content="My Faith Log" />
   </Head>
    <View style={{flex:1,backgroundColor:'#E8751A',justifyContent:'center',alignItems:'center',paddingTop:16}}>
      <Text>Faith Log List!</Text>
   {Platform.OS !== "web"? <ScrollView >
      {
        formData?.map((item:any,index:any)=>(
          <Animated.View entering={FadeInLeft.duration(500).easing(Easing.ease)} style={styles.itemView} key={index}>
          <DailyQtList key={item.id} item={item} />
          </Animated.View>
        ))
      }
    </ScrollView>
    :
    <ScrollView>
      {
        formData?.map((item:any,index:any)=>(
          <View style={styles.itemView} key={index}>
          <DailyQtList key={item.id} item={item} />
          </View>
        ))
      }
    </ScrollView>
    }
    </View>
    </>
  )
}

export default DailyQt
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