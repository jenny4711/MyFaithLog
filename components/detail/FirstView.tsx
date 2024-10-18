import { View, Text ,TouchableOpacity,StyleSheet,Dimensions,SafeAreaView} from 'react-native'
import React,{useState,useEffect} from 'react'

const {width,height}=Dimensions.get('window')
const FirstView = ({date,showDone,fnBtn}:any) => {
  

  return (
    <View style={[{width:width-48, backgroundColor: '#E8751A',alignItems:'flex-end'}]}>
      <View style={[styles.container]}>
      <Text style={{fontSize:18,fontWeight:700,color:'white',fontFamily:'LineSeedBd'}}>{date}</Text>
      <TouchableOpacity onPress={fnBtn}>
        <Text style={{fontSize:18,fontWeight:700,color:'white',fontFamily:"LineSeedBd"}}>{showDone?'Done':'Edit'}</Text>
      </TouchableOpacity>
      </View>
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
    marginVertical: 16,
    // alignItems: 'flex-start',
    // paddingHorizontal: 24,
  //  marginLeft:140,
    // paddingTop:15,
    backgroundColor: '#E8751A',
    
    
    
   
   
  }

})