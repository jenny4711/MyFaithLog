import { View, Text,StyleSheet,TouchableOpacity,Dimensions,KeyboardAvoidingView,Keyboard,TextInput,Platform,ScrollView,Alert } from 'react-native'
import React from 'react'
const {width,height} = Dimensions.get('window')
import Animated,{Easing,FadeInLeft} from 'react-native-reanimated'
const DailyForm = ({
  setMeditation,
  setApplication,
  setPray,meditation,
  application,pray,
  lang,medRef,
  appRef,
  prayRef,
  scrollToInput
}:any) => {
  return (
    <View>
      
<Animated.View style={[styles.inputView]} entering={FadeInLeft.duration(500).easing(Easing.ease)}>
  <TextInput
    style={styles.inputText}
    placeholder={lang==="Kr"?"묵상":"Meditation"}
    value={meditation}
    onChangeText={setMeditation}
    multiline={true}
    ref={medRef}
    onFocus={()=>scrollToInput(prayRef)}
  />
</Animated.View>

<Animated.View style={[styles.inputView,{marginVertical:10}]} entering={FadeInLeft.duration(500).easing(Easing.ease)}>
  <TextInput
    ref={appRef}
    style={[styles.inputText,{marginVertical:10}]}
    placeholder={lang==="Kr"?"적용":"Application"}
    value={application}
    onChangeText={setApplication}
    multiline={true}
    onFocus={()=>scrollToInput(prayRef)}
  />
</Animated.View>

<Animated.View style={[styles.inputView]} entering={FadeInLeft.duration(500).easing(Easing.ease)}>
  <TextInput
    ref={prayRef}
   style={styles.inputText}
    placeholder={lang==="Kr"?"기도":"Pray"}
    value={pray}
    onChangeText={setPray}
    multiline={true}
    onFocus={()=>scrollToInput(prayRef)}
  />
</Animated.View>

    </View>
  )
}

export default DailyForm
const styles=StyleSheet.create({
  inputText: {
    width:width-48,
    height:110,
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