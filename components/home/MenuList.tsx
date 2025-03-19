import { View, Text,TouchableOpacity ,Image,StyleSheet} from 'react-native'
import React ,{useEffect,useState}from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from 'expo-router';
import { useStorageContext } from '~/context/StorageContext';
const MenuList = ({address}:{address:string}) => {
    const logo = require('../../assets/logomt.png');
  const navigation=useNavigation()
  const {setCategory,category }=useStorageContext()


  return (
    <>
     <View style={{flexDirection:'column',backgroundColor:'#D7A31F',paddingTop:40}}>
                            
                            <Image source={logo} style={{height:80}}/>
                             
                            </View>
    
    
                     <View  style={{height:'75%',justifyContent:'center'}}>
                      <View>
                           <TouchableOpacity onPress={()=>(navigation as any).navigate("form")} style={{width:212,height:100,backgroundColor:'#ffffff',borderRadius:10,justifyContent:'center',alignItems:'center',marginBottom:12}}>
                            <Text style={{fontWeight:'bold',fontSize:18}}>작성하기</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=>(navigation as any).navigate(address)} style={{width:212,height:100,backgroundColor:'#ffffff',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                           <Text style={{fontWeight:'bold',fontSize:18}}>리스트 보기</Text>
                           </TouchableOpacity>
                           </View>
                           </View>
    
                           <View style={{width:'100%',height:100,alignItems:"flex-end",marginRight:80}}>
                            <TouchableOpacity onPress={()=>(navigation as any).navigate("home")} style={styles.btn}>
                            <Feather name="home" size={32} color="black" />
                            </TouchableOpacity>
                           </View>
                           </>
  )
}

export default MenuList
const styles=StyleSheet.create({
  btn:{
    width:60,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:100,


  },
})