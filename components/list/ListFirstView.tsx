import { View, Text,StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation ,useRouter} from 'expo-router';
const {width,height}=Dimensions.get('window')
const ListFirstView = ({title}:any) => {
  const navigation = useNavigation()
  const router = useRouter();
  const goToSetting=()=>{
    router.back(); // 모달 닫기
    router.push('/setting')
  }
  const goToHome=()=>{
    router.back(); // 모달 닫기
    router.push('/home')
  }




  return (
    <View style={{width:width-48,alignItems:'flex-end',paddingVertical:16}}>
      <View style={{flexDirection:'row',width:(width)*.56, justifyContent: 'space-between'}}>
      <Text style={{fontSize:20,fontFamily: 'LotteBd'}}>{title}</Text>
      <TouchableOpacity onPress={goToHome} style={{marginRight:8}}>
      <Ionicons name="home-outline" size={24} color="#fff" />
      </TouchableOpacity>
        </View>
    </View>
  )
}

export default ListFirstView