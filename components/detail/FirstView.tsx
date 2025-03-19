import { View, Text ,TouchableOpacity,StyleSheet,Dimensions,SafeAreaView} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
const {width,height}=Dimensions.get('window')
const FirstView = ({date,showDone,fnBtn}:any) => {
  const navigation = useNavigation()
  const router = useRouter();

  const goToHome=()=>{
    router.back(); // 모달 닫기
    // router.push('/home')
  }

  return (
    <View style={[{width:width-48, backgroundColor:'#D7A31F',alignItems:'flex-end',justifyContent:'center'}]}>
      <View style={[styles.container]}>
      <TouchableOpacity onPress={goToHome} style={{marginRight:8}}>
      <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      {/* <Text style={{fontSize:18,fontWeight:700,color:'white',fontFamily:'LineSeedBd'}}>{date}</Text> */}
      <TouchableOpacity onPress={fnBtn}>
        <Text style={{fontSize:18,fontWeight:700,color:'white',fontFamily:"LineSeedBd"}}>{showDone?'Done':'Edit'}</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default FirstView
const styles=StyleSheet.create({
  container: {

    justifyContent: 'space-between',
    flexDirection: 'row',
    width:width-48,
    height:height/19,
    marginVertical: 16,
    // alignItems: 'flex-start',
    // paddingHorizontal: 24,
  //  marginLeft:140,
    // paddingTop:15,

    
    
    
   
   
  }

})