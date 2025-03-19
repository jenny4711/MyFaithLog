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
          style={{width:width-100,height:sizeH+15,padding:10,borderRadius:10,fontSize:18,alignItems:'center',justifyContent:'center',lineHeight:33}}
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
   
    width:width-90,
   borderWidth:1,
    borderColor:'black',
    marginVertical:8,
   padding:16,
    borderRadius:10,
    shadowColor: "#000",
  
    
  }
})
