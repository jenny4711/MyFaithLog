import { View,  Dimensions,  TouchableOpacity, StyleSheet } from 'react-native';
import React,{useEffect,useState} from 'react';

import Animated, { Easing} from 'react-native-reanimated';
import { FadeInRight } from 'react-native-reanimated';
import { useTheme } from '../../Theme/ThemeProvider';

import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const SinglePhotoForm = ({imges,pickImage}:any) => {
 const [showBtn,setShowBtn]=useState(false)
    const { colors, dark } = useTheme();
   
  return (
    <>
    {imges?.length < 1 ?
      <View style={[imges?.length < 1 ?styles.btnView: { display: 'none' }  ]}>
        <View  >
        <TouchableOpacity
         activeOpacity={1}
         delayLongPress={0}
         onPress={pickImage}
          style={[styles.imageView,{backgroundColor:'white'}]}>

{  <Ionicons name="image-outline" size={24} color="black" />}
        </TouchableOpacity>
        </View>
      </View>:null}
      </>
  )
}

export default SinglePhotoForm

const styles = StyleSheet.create({
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
   
  },
  btnView: {
    justifyContent:'center',
    alignItems:'center' ,
    width:width-48
  }

});
