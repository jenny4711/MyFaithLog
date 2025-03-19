import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image as RnImage
} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { saveImageLocally } from '~/utils/localStorageFn';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FadeInRight } from 'react-native-reanimated';
import { useStorageContext } from '~/context/StorageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EachImage from './EachImage';
import { useTheme } from '~/Theme/ThemeProvider';
import { useNavigation } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SinglePhotoForm from './SinglePhotoFrom';
import {uploadImageStorage} from '~/utils/fireStoreFn'
const { width, height } = Dimensions.get('window');
const AddPhoto = ({showDone,photo,setPhoto}:any) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const {imges,setImges,setPreImages,setIsLoadingImages,setProgress,isLoadingImages} = useStorageContext()
  const [img,setImg]=useState<any>('')
  const screenSize = Dimensions.get('window');
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [deleteMargin, setDeleteMargin] = useState({ top: 16, right: 16 });
  const [imgMarginHR, setImgMarginHR] = useState(0);
  useEffect(() => {
    if (imges?.length === 1) {
      setImgSize({
        width: screenSize.width - 48,
        height: screenSize.width - 48,
      });
      setDeleteMargin({ top: 16, right: 16 });

      // setImgSize({
      //   width: (screenSize.width - 48) / 2 - 8,
      //   height: (screenSize.width - 48) / 2 - 8,
      // });
      // setDeleteMargin({ top: 12, right: 12 });
      setImgMarginHR(8);
    } else if (imges?.length === 2 || imges?.length === 3) {
      setImgSize({
        width: (screenSize.width - 48) / 3 - 8,
        height: (screenSize.width - 48) / 3 - 8,
      });
      setDeleteMargin({ top: 8, right: 16 });
      setImgMarginHR(8);
    } else {
      setImgSize({
        width: screenSize.width - 48,
        height: screenSize.width - 48,
      });
      setDeleteMargin({ top: 16, right: 16 });
    }
  }, [imges, photo]);


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
    
    const email = await AsyncStorage.getItem('email');

    if (imges.length >= 3) {
      return; // 이미지가 3개 이상일 경우 추가하지 않음
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
      selectionLimit: 3 - imges.length,
      // allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(
        (selectedImage) => selectedImage.uri
      );

      if (email) {
        // 로그인한 경우 Firebase에 업로드
        setImges((prevImgs: any) => [...prevImgs, ...selectedImages]);
        setPreImages((prevImgs: any) => [...prevImgs, ...selectedImages]);
        setIsLoadingImages((prevLoadingStates:any) => [
          ...prevLoadingStates,
          ...selectedImages.map(() => true),
        ]);

        const uploadPromises = selectedImages.map(async (uri, index) => {
          try {
            const res = await uploadImageStorage(
              uri,
              'image',
              (progressValue) => {
                setProgress(progressValue);
                setIsLoadingImages((prevLoadingStates:any) => {
                  const updatedLoadingStates = [...prevLoadingStates];
                  const currentIndex = imges.length + index;
                  updatedLoadingStates[currentIndex] = progressValue !== 100;
                  return updatedLoadingStates;
                });
              }
            );
            setPhoto((prevPhotos: any) => [...prevPhotos, res]);
            setIsLoadingImages((prevLoadingStates:any) => {
              const updatedLoadingStates = [...prevLoadingStates];
              updatedLoadingStates[imges.length + index] = false;
              return updatedLoadingStates;
            });
          } catch (error) {
            console.error('업로드 실패:', error);
          }
        });

        await Promise.all(uploadPromises);
      } else {
        // 로그아웃 상태인 경우 AsyncStorage에 저장
        selectedImages.forEach(async (uri, index) => {
          await saveImageLocally(uri);
          setImges((prevImgs: any) => [...prevImgs, uri]);
          setPreImages((prevImgs: any) => [...prevImgs, uri]);
          setPhoto((prevPhotos: any) => [...prevPhotos, uri]);
          setIsLoadingImages((prevLoadingStates:any) => {
            const updatedLoadingStates = [...prevLoadingStates];
            updatedLoadingStates[imges.length + index] = false;
            return updatedLoadingStates;
          });
        });
      }
    }
  };
;


const deleteImage=async(imgUri: string, idx: number)=>{
  try{
    const existingImages = await AsyncStorage.getItem('dailyData');
      
        if (existingImages) {
          const parsedImages = JSON.parse(existingImages);
          const updatedImages = parsedImages.filter(
            (imgUriItem: string) => imgUriItem !== imgUri
          );
        console.log(updatedImages,'updatedImages')
          await AsyncStorage.setItem(
            'localImages',
            JSON.stringify(updatedImages)
          );
          setImges((prevImgs: any) =>
            prevImgs.filter((imgUriItem: string) => imgUriItem !== imgUri)
          );
          setPreImages((prevImgs: any) =>
            prevImgs.filter((imgUriItem: string) => imgUriItem !== imgUri)
          );
          setPhoto((prevImgs: any) =>
            prevImgs.filter((imgUriItem: string) => imgUriItem !== imgUri)
          );
        }
  }catch(error){
    console.log(error,'error')
  }
}

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




  return (
    <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      width: width - 48,
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {Array.isArray(imges) &&
        imges.map((item: any, index: number) => (
          <View
            key={index}
            style={{
              width: imgSize.width, // 이미지 크기 (두 개씩 보이게 설정)

              flexDirection: 'row',
              // marginRight: index === 2 ? 0 : imgMarginHR, // 이미지 간격
              justifyContent: 'center',
            }}
          >
            <EachImage
              img={item}
              imgSize={imgSize}
              deleteImage={deleteImage}
              idx={index}
              deleteMargin={deleteMargin}
              imges={imges}
              isLoading={isLoadingImages[index]}
            />
          </View>
        ))}
        <SinglePhotoForm  imges={imges} pickImage={pickImage}/>
      
      {/* <MultiPhotoForm
        imges={imges}
        img={img}
        imgSize={imgSize}
        pickImage={pickImage}
      /> */}
    </View>
  </View>
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

