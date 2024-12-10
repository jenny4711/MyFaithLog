import { View, Text, ScrollView, Dimensions, StyleSheet, Platform ,ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useData } from '~/hooks/useFormData';
import DailyQtList from '~/components/list/DailyQtList';
import Animated, { Easing, FadeInLeft } from 'react-native-reanimated';
import Head from 'expo-router/head';
import { useRouter } from 'expo-router';
import ListFirstView from '~/components/list/ListFirstView';
const { width } = Dimensions.get('window');

const DailyQt = () => {
  const [category, setCategory] = useState('dailyQt');
  const [formData, setFormData] = useState<any>([]);
  const [move, setMove] = useState<boolean>(false);
  const { data } = useData(category); // 데이터 가져오기
 const router = useRouter();
// useEffect(()=>{
//   if(move){
// router.back()
// setMove(false)
//   }
// },[move])

  useEffect(() => {
    if (data) {
      const sortedList = data.sort((a, b) => {
        // '10-16-2024' 같은 형식을 'MM-DD-YYYY'로 Date 객체로 변환
        const dateA:any = new Date(`${a.date.split('-')[2]}-${a.date.split('-')[0]}-${a.date.split('-')[1]}`);
        const dateB:any = new Date(`${b.date.split('-')[2]}-${b.date.split('-')[0]}-${b.date.split('-')[1]}`);
        
        // 최신순으로 정렬
        return dateB - dateA;
      });
  
      // 정렬된 리스트 확인
      console.log('Sorted List:', sortedList);
  
      // 정렬된 데이터가 기존 formData와 다를 경우에만 업데이트
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
      <View style={{ flex: 1, backgroundColor: '#E8751A', alignItems: 'center', paddingTop: 16 }}>

        <ListFirstView title={'묵상 리스트'} />
        {/* <Text style={{fontSize:20,fontFamily: 'LotteBd'}}>묵상 리스트</Text> */}
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
                    <DailyQtList key={item.id} item={item} move={move} setMove={setMove} />
                  </Animated.View>
                ) : (
                  <View key={index} style={styles.itemView}>
                    <DailyQtList key={item.id} item={item} move={move} setMove={setMove}  />
                  </View>
                )
              ))
            }
          </ScrollView>
        ) : (
          <View>
            <ActivityIndicator size="large" color="white" />
          </View>// 데이터가 없을 경우 기본 메시지
        )}
      </View>
    </>
  );
};

export default DailyQt;

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
  }
});
