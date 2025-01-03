import { View, Text ,ScrollView,StyleSheet,Dimensions,TouchableOpacity,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useLocalSearchParams ,useNavigation} from 'expo-router'
import Animated,{Easing,FadeInLeft,FadeInUp,FadeInDown} from 'react-native-reanimated'
const {width} = Dimensions.get('window')
const DetailWithEdit = ({sizeH,text,value,setChange}:any) => {
  return (
    <>
    {
     <Animated.ScrollView entering={FadeInUp.duration(200).easing(Easing.ease)} style={[styles.itemView]}>
      <TextInput
          style={{width:width-60,height:sizeH+15,backgroundColor:'white',padding:10,borderRadius:10,marginVertical:10,fontSize:18,alignItems:'center',justifyContent:'center'}}
          placeholder={text}
          value={value}
          onChangeText={setChange}
          multiline={true}
          
        />
     </Animated.ScrollView>
     
     
     }
    </>
  )
}

export default DetailWithEdit
const styles=StyleSheet.create({
  itemView:{
  
   marginHorizontal:24,
    backgroundColor:'white',
    width:width-48,
    marginVertical:8,
   padding:16,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  }
})
