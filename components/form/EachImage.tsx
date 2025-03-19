import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
  Image as RnImage,
} from 'react-native';
import React ,{useState,useEffect}from 'react';
import { useTheme } from '~/Theme/ThemeProvider';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

const EachImage = ({
  idx,
  img,
 
  imgSize,
 
  deleteImage,
  deleteMargin,
  imges,
 
  isLoading,
}: any) => {
  const navigation = useNavigation();
  const { colors, dark } = useTheme();
  const [showBtn,setshowBtn]=useState(false)
useEffect(()=>{
  if(img){
    setTimeout(()=>setshowBtn(true),100)
  }else{
    setshowBtn(false)
  }
},[img])

  return (
    <>
      <View key={idx} style={{ alignItems: 'center' }}>
        {isLoading && (
          <View
            style={[
              styles.loadingOverlay,
              { backgroundColor: colors.loadingBK },
            ]}
          >
            <ActivityIndicator size="small" color={colors.text} />
          </View>
        )}
        
        <TouchableOpacity
          style={{ marginHorizontal: imges.length > 1 ? 8 : 0 }}
          activeOpacity={1}
          onPress={() =>
            (navigation as any).navigate('imgDetail/[img]', {
              img: img,
              idx: idx,
              w: imgSize.width,
              h: imgSize.height,
              t: 'hey',
            })
          }
        >
          <Image
            contentFit="cover"
            source={{ uri: img }}
            style={{
              width: imgSize.width,
              height: imgSize.height,
              borderRadius: 24,
              position:'relative'
            }}
            cachePolicy={'memory'}
          />



        </TouchableOpacity>
       {showBtn && <TouchableOpacity
            activeOpacity={1}
            delayLongPress={0}
          style={{
            position: 'absolute',
            width: 24,
            height: 24,
           
            backgroundColor: '#FFFFFF',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            // marginLeft: moderateScale(1),
            top: deleteMargin.top,
            right: deleteMargin.right,
          }}
          onPress={
            !isLoading
              ? () => deleteImage(img, idx)
              : () => {
                  console.log('null');
                }
          }
        >
          <Ionicons name="close" size={12} color={'black'} />
        </TouchableOpacity>}
        </View>
   
    </>
  );
};

export default EachImage;

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 1,
  },
});