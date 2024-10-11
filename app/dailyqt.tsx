import { View, Text, ScrollView, Dimensions, StyleSheet, Platform ,ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useData } from '~/hooks/useFormData';
import DailyQtList from '~/components/list/DailyQtList';
import Animated, { Easing, FadeInLeft } from 'react-native-reanimated';
import Head from 'expo-router/head';

const { width } = Dimensions.get('window');

const DailyQt = () => {
  const [category, setCategory] = useState('dailyQt');
  const [formData, setFormData] = useState<any>([]);
  const { data } = useData(category); // 데이터 가져오기
  console.log('Loaded data:', data); // 데이터 로드 확인

  useEffect(() => {
    if (data) {
      const sortedList = data.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('-');
        const [dayB, monthB, yearB] = b.date.split('-');

        if (yearA !== yearB) {
          return parseInt(yearB) - parseInt(yearA);
        }

        if (monthA !== monthB) {
          return parseInt(monthB) - parseInt(monthA);
        }

        return parseInt(dayB) - parseInt(dayA);
      });

      console.log('Sorted List:', sortedList); // 정렬된 리스트 확인

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
      <View style={{ flex: 1, backgroundColor: '#E8751A', justifyContent: 'center', alignItems: 'center', paddingTop: 16 }}>
        <Text>Faith Log List!</Text>
        {formData.length > 0 ? (
          <ScrollView>
            {
              formData.map((item: any, index: any) => (
                // 플랫폼에 따라 Reanimated.View를 대체
                Platform.OS !== 'web' ? (
                  <Animated.View
                    key={index}
                    entering={FadeInLeft.duration(500).easing(Easing.ease)}
                    style={styles.itemView}>
                    <DailyQtList key={item.id} item={item} />
                  </Animated.View>
                ) : (
                  <View key={index} style={styles.itemView}>
                    <DailyQtList key={item.id} item={item} />
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
