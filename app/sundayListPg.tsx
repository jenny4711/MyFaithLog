import { View, Text, ScrollView, Dimensions, StyleSheet, Platform ,ActivityIndicator} from 'react-native';
import React, { useState, useEffect,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import DailyQtList from '~/components/list/DailyQtList';
import Animated, { Easing, FadeInLeft } from 'react-native-reanimated';
import Head from 'expo-router/head';
import SundayQtList from '~/components/list/SundayQtList';
import { useRouter } from 'expo-router';
import ListFirstView from '~/components/list/ListFirstView';
import { getSundayData} from '~/utils/localStorageFn';
const { width } = Dimensions.get('window');
const SundayListPg = () => {
  const [formData, setFormData] = useState<any>([]);
  const [move, setMove] = useState<boolean>(false);

useEffect(()=>{
  async function getData(){
    const res = await getSundayData()

    
    setFormData(res)
  }
  getData()
},[])


useFocusEffect(
    useCallback(() => {
      async function getData(){
        const res = await getSundayData()

    
    setFormData(res)
       
      }
      getData()
    }, [])
  );



  return (
    <>
    <Head>
      <title>My Faith Log</title>
      <meta name="description" content="My Faith Log" />
    </Head>
    <View style={{ flex: 1, backgroundColor:'#D7A31F', alignItems: 'center', paddingTop: 16 }}>

      <ListFirstView title={'묵상 리스트'} />
      {formData.length > 0 ? (
        <ScrollView 
        showsVerticalScrollIndicator={false}
        >
          {
            formData.map((item: any, index: any) => (
              // 플랫폼에 따라 Reanimated.View를 대체
              Platform.OS !== 'web' ? (
                <Animated.View
                  key={index}
                  entering={FadeInLeft.duration(500).easing(Easing.ease)}
                  style={styles.itemView}>
                  <SundayQtList key={item.id} item={item} move={move} setMove={setMove} />
                </Animated.View>
              ) : (
                <View key={index} style={styles.itemView}>
                  <SundayQtList key={item.id} item={item} move={move} setMove={setMove}  />
                </View>
              )
            ))
          }

        </ScrollView>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontFamily:'LotteBd',fontSize:20}}>리스트가 없습니다.</Text>
        </View>// 데이터가 없을 경우 기본 메시지
      )}
    </View>
  </>
  )
}

export default SundayListPg
const styles = StyleSheet.create({
  itemView: {
    backgroundColor: 'white',
    width: width - 48,
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btn:{
    width:60,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:100,


  },
});