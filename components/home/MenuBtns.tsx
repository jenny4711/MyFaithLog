import { View, Text ,TouchableOpacity,StyleSheet,Dimensions,Platform} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const {width,height} = Dimensions.get('window')
const MenuBtns = ({title,address}:any) => {
  const navigation = useNavigation();
  return (
    <View >
      <TouchableOpacity style={styles.container} onPress={()=>(navigation as any).navigate(address)}>
      <Text style={{fontSize:16,fontFamily:"LineSeedKr-Bd"}}>{title}</Text>
      </TouchableOpacity>
     
    </View>
  )
}

export default MenuBtns
const styles=StyleSheet.create({
  container:{
    
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    height:height/12,
    width:Platform.OS ==='web'?(width/2)-48:width-48,
    marginBottom:10,
    borderRadius:10,
  },
  SecContainer:{
    width:width-48,
    justifyContent:'center',
    alignItems:'center',

  }
})