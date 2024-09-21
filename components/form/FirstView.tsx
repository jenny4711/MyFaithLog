import { View, Text,StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Selection from './Selection';
import { langArr ,bibleArrEn,bibleArrKr,categoryEnArr,categoryKrArr} from '~/utils/selectionArray';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation ,useRouter} from 'expo-router';
const {width,height}=Dimensions.get('window')
const FirstView = ({lang,setLang,setTheBible,theBible,category,setCategory}:any) => {
  const navigation = useNavigation()
  const router = useRouter();
  const goToSetting=()=>{
    router.back(); // 모달 닫기
    router.push('/setting')
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
     {/* <Selection arr={langArr} setChange={setLang} placeHolder={<MaterialIcons name="language" size={24} color="black" />} btnWidth={width-360}/> */}
     {/* <Selection arr={lang !== "En"?bibleArrKr:bibleArrEn} setChange={setTheBible} placeHolder={lang ==="Kr"?"성경":"The Bible"} btnWidth={width-345}/> */}
     <Selection arr={lang !== "En"?categoryKrArr:categoryEnArr} setChange={setCategory} placeHolder={lang ==="Kr"?"카테고리":"Category"} btnWidth={width-345}/>
     </View>
     <TouchableOpacity onPress={goToSetting}>
     <AntDesign name="setting" size={24} color="black" />
     </TouchableOpacity>
    </View>
  )
}

export default FirstView
const styles = StyleSheet.create({
  container: {
  width:width,
  height:50,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'red',
    flexDirection: 'row',
    paddingHorizontal:14,
  }
})