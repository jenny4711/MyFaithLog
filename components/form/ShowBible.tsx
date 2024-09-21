import React, { forwardRef } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Dimensions,KeyboardAvoidingView,Keyboard,TextInput,Platform,ScrollView,Alert } from 'react-native'
const {width,height} = Dimensions.get('window')
export type Ref=TextInput;
const ShowBible = forwardRef<Ref,any>(({ setChange, value, lang, theBible, Ref2 } ,ref) => {
  return (
    <>
      <TextInput
        placeholderTextColor={'gray'}
        multiline={false}
        style={{ justifyContent: 'center', alignItems: 'center', fontSize: 18 ,width:40}}
        placeholder=''
        value={value}
        ref={ref}
        returnKeyType={"next"}
        onSubmitEditing={() => {
          Ref2.current?.focus();
        }}
        blurOnSubmit={false}
        onChangeText={setChange}
      />
    </>
  );
});

export default ShowBible;

const styles=StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'#E8751A',
    flexDirection: 'column',
    height:height,
    paddingBottom:50
    
   
   
  },    
  containerWithKeyboard: {
    flex: 1,
    // paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'#E8751A',
    flexDirection: 'column',
    height:height,
    paddingBottom:350

  },
  selectionView: {
    flexDirection:'row',
    width:(width-68)/4,
    justifyContent:"center",
    alignItems:'center',
    // paddingHorizontal:14,
    borderRadius:5,
    height:30,
    borderBottomWidth:0.2,
    borderBottomColor:'gray',
    marginVertical:12
  },
  
})