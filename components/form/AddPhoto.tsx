import { View, Text, Dimensions, Image, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../../utils/cloudinary';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FadeInRight } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window');
const AddPhoto = ({showDone,photo,setPhoto}:any) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const [img,setImg]=useState<any>('')
  useEffect(()=>{
  
    if(photo){
     setImg(photo)
   
    }else{
     setImg('')
    }
   
   },[photo])
   useEffect(() => {
    if (img || photo) {
      opacity.value = withTiming(1, { duration: 800 });
      scale.value = withTiming(1);
    }
  }, [img, photo]);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImg(selectedImageUri)
 
     
      const res = await uploadImage(selectedImageUri);
      setPhoto(res.secure_url)
   
      await AsyncStorage.setItem('photoURL', res.secure_url);
 
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
    
      opacity: withTiming(img ? 1 : 0, { duration: 100 ,easing:Easing.out(Easing.exp)}), 
      transform: [{ scale: withTiming(img ? 1 : 0.8, { duration: 100 ,easing:Easing.out(Easing.exp)}) }],
    };
  });

  const animatedStyleBtn = useAnimatedStyle(() => {
    return {
    
      opacity: withTiming(img ? 1 : 0, { duration: 5000 ,easing:Easing.out(Easing.ease)}), 

    };
  });

  const deleteImage = () => {
    setPhoto('')
    setImg('')
  }








  return (
    <>
    <Animated.View  entering={FadeInRight.duration(100).easing(Easing.ease)}>
    

 
     

{img ?img&& (
    <Animated.View style={{marginVertical:16, justifyContent:'center', alignItems:'center' }}>
  <Animated.Image

    source={{ uri: img }}
    style={[{
      width: width - 48,
      height: height-350,
      borderRadius: 24,

    }, animatedStyle]}
  />
 {  showDone && img? (
          <Animated.View style={animatedStyleBtn}>
          <TouchableOpacity
              style={[
                
                  { backgroundColor: 'white',  zIndex: 1, bottom:height- 360, left:width-245,borderRadius:100},
                   
              ]}
              onPress={ deleteImage}
          >
                <MaterialIcons name="delete-outline" size={24} color="black" />
          </TouchableOpacity>
          </Animated.View>
       
      ) :null}
  </Animated.View>
      
) : null}

  </Animated.View>
{!img?
  <View style={[!showDone ? { display: 'none' } : styles.btnView]}>
    <Animated.View  entering={FadeInRight.duration(100).easing(Easing.ease)}>
    <TouchableOpacity onPress={pickImage} style={[styles.imageView,{backgroundColor:'white'}]}>
    <Ionicons name="image-outline" size={24} color="black" />
    </TouchableOpacity>
    </Animated.View>
  </View>:null}
</>
  )
}

export default AddPhoto
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

