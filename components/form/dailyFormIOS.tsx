import { View, Text,StyleSheet,TouchableOpacity,Dimensions,KeyboardAvoidingView,Keyboard,TextInput,Platform,ScrollView,Alert } from 'react-native'
import React,{useState} from 'react'
import StatusCheck from './StatusCheck'
const {width,height} = Dimensions.get('window')
import Animated,{Easing,FadeInLeft} from 'react-native-reanimated'
const DailyFormIOS = ({
  setMeditation,
  setApplication,
  setPray,meditation,
  application,
  pray,
  lang,
  medRef,
  appRef,
  prayRef,
  scrollToInput
}:any) => {
  const [inputHeightApp, setInputHeightApp] = useState(67); 
  const [inputHeightMed, setInputHeightMed] = useState(67); 
  const [inputHeightPray, setInputHeightPray] = useState(67); 
  const lineHeight=19.09
const paddingVertical = 20;

const handleContentSizeChangeApp = (contentSize: { height: number }) => {
  // 입력된 높이를 바탕으로 줄 수를 계산
  const numberOfLines = Math.ceil(contentSize.height / lineHeight);
  let newHeight;

  // 두 번째 줄부터 높이를 조정
  if (numberOfLines > 2) {
  
     newHeight = Math.max(67, numberOfLines * lineHeight+paddingVertical+paddingVertical); // 두 번째 줄부터 높이를 조정
  } else {
    newHeight = 67; // 첫 번째 줄일 때는 기본 높이 유지
  }

  setInputHeightApp(newHeight); // 새로운 높이 설정
};

const handleContentSizeChangeMed = (contentSize: { height: number }) => {
  // 입력된 높이를 바탕으로 줄 수를 계산
  const numberOfLines = Math.ceil(contentSize.height / lineHeight);
  let newHeight;

  // 두 번째 줄부터 높이를 조정
  if (numberOfLines > 2) {
   console.log('numberOfLines',numberOfLines)
     newHeight = Math.max(67, numberOfLines * lineHeight+paddingVertical+paddingVertical); // 두 번째 줄부터 높이를 조정
  } else {
    newHeight = 67; // 첫 번째 줄일 때는 기본 높이 유지
  }

  setInputHeightMed(newHeight); // 새로운 높이 설정
};

const handleContentSizeChangePray = (contentSize: { height: number }) => {
  // 입력된 높이를 바탕으로 줄 수를 계산
  const numberOfLines = Math.ceil(contentSize.height / lineHeight);
  let newHeight;

  // 두 번째 줄부터 높이를 조정
  if (numberOfLines > 2) {
   console.log('numberOfLines',numberOfLines)
     newHeight = Math.max(67, numberOfLines * lineHeight+paddingVertical+paddingVertical); // 두 번째 줄부터 높이를 조정
  } else {
    newHeight = 67; // 첫 번째 줄일 때는 기본 높이 유지
  }

  setInputHeightPray(newHeight); // 새로운 높이 설정
};





  return (
    <View style={{width:width,alignItems:'center'}}>
      
<Animated.View style={[styles.inputView]} entering={FadeInLeft.duration(500).easing(Easing.ease)}>
  <TextInput
    style={[styles.inputText,{height:inputHeightMed}]}
    placeholder={lang==="Kr"?"묵상":"Meditation"}
    value={meditation}
    onChangeText={setMeditation}
    multiline={true}
    ref={medRef}
    //  onFocus={()=>scrollToInput(prayRef)}
    onContentSizeChange={(e) => handleContentSizeChangeMed(e.nativeEvent.contentSize)}
  />
</Animated.View>

{meditation !=="" && <Animated.View style={[styles.inputView,{marginVertical:16}]} entering={FadeInLeft.duration(500).easing(Easing.ease)}>
  <TextInput
    ref={appRef}
    style={[styles.inputText,{marginVertical:10,height:inputHeightApp}]}
    placeholder={lang==="Kr"?"적용":"Application"}
    value={application}
    onChangeText={setApplication}
    multiline={true}
    //  onFocus={()=>scrollToInput(prayRef)}
    onContentSizeChange={(e) => handleContentSizeChangeApp(e.nativeEvent.contentSize)}
  />
</Animated.View>}

{application !=="" && <Animated.View style={[styles.inputView]} entering={FadeInLeft.duration(500).easing(Easing.ease)}>
  <TextInput
    ref={prayRef}
   style={[styles.inputText,{height:inputHeightPray}]}
    placeholder={lang==="Kr"?"기도":"Pray"}
    value={pray}
    onChangeText={setPray}
    multiline={true}
    //  onFocus={()=>scrollToInput(prayRef)}
    onContentSizeChange={(e) => handleContentSizeChangePray(e.nativeEvent.contentSize)}
  />
</Animated.View>}


    </View>
  )
}

export default DailyFormIOS
const styles=StyleSheet.create({
  inputText: {
    width: width -96,
    
    backgroundColor:'white',
    padding:10,
    borderRadius:10

  },
  inputView:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor:'white',
    borderRadius:10,

  }
})