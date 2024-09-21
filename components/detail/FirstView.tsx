import { View, Text ,TouchableOpacity,StyleSheet,Dimensions,SafeAreaView} from 'react-native'
import React,{useState,useEffect} from 'react'

const {width,height}=Dimensions.get('window')
const FirstView = ({date,showDone,fnBtn}:any) => {
  

  return (
    <View style={[styles.container,{ backgroundColor: '#E8751A',}]}>
      <Text style={{fontWeight:700,color:'white',fontFamily:'LineSeedBd'}}>{date}</Text>
      <TouchableOpacity onPress={fnBtn}>
        <Text style={{fontWeight:700,color:'white',fontFamily:"LineSeedBd"}}>{showDone?'Done':'Edit'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FirstView
const styles=StyleSheet.create({
  container: {
   
    justifyContent: 'space-between',
    flexDirection: 'row',
    width:width/2,
    height:height/19,
    marginTop: 16,
    // alignItems: 'flex-start',
    // paddingHorizontal: 24,
   marginLeft:150,
    paddingTop:15,
    
    
    
   
   
  }

})