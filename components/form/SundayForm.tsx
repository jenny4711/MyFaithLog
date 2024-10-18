import { View, Text,TextInput ,Dimensions,StyleSheet} from 'react-native'
import React from 'react'
import AddPhoto from './AddPhoto'
import Animated,{Easing,FadeInLeft,FadeInRight} from 'react-native-reanimated'
const {width,height} = Dimensions.get('window')
const SundayForm = ({note,setNote,photo,setPhoto,showDone,lang,category}:any) => {
console.log(category)
  return (
    <View style={{flex:1,width:width,justifyContent:'center',alignItems:'center'}}>
     <AddPhoto photo={photo} setPhoto={setPhoto} showDone={showDone}/>
     <Animated.View style={[category==="source"?{display:'none'}:styles.inputView,{marginTop:10}]} exiting={FadeInLeft.duration(500).easing(Easing.ease)} entering={FadeInRight.duration(500).easing(Easing.ease)} >
  <TextInput
    style={{width:width-48,height:320,backgroundColor:'white',padding:10,borderRadius:10}}
    placeholder={lang==="Kr"?"노트":"Note"}
    value={note}
    onChangeText={setNote}
    multiline={true}
  />
</Animated.View>
    </View>
  )
}

export default SundayForm
const styles=StyleSheet.create({
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