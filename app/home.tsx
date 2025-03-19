import { View, Text ,Dimensions,SafeAreaView, StyleSheet,TouchableOpacity,Platform,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import MenuBtns from '~/components/home/MenuBtns'
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import Head from 'expo-router/head';
import Ionicons from '@expo/vector-icons/Ionicons';
const {width,height} = Dimensions.get('window')
const Home = () => {
  const navigation = useNavigation()
  const logo = require('../assets/logomt.png');
  return (
    <>
    <Head>
      <title>My Faith Log</title>
      <meta name="description" content="My Faith Log" />
   </Head>

   <View style={{flexDirection:'column',alignItems:'center', backgroundColor:'#D7A31F',paddingTop:140}}>
                  
                  <Image source={logo} style={{height:80}}/>
                    <Text style={[styles.title]}>Faith Log</Text>
                  </View>

 

    <SafeAreaView style={styles.container}>

      <View style={{marginBottom:100}} >
        <View style={{flexDirection:'row'}}>
        <MenuBtns title="묵상일지" address="dailyqt"/>
        <MenuBtns title="주일말씀" address="sunday"/>
        </View>
        <View style={{flexDirection:'row'}}>
        <MenuBtns title="말씀 저장" address="savedBible"/>
        <MenuBtns title="감사일기" address="thanks"/>
        </View>
     
     
      {/* <MenuBtns title="자료실" address="source"/>
      <MenuBtns title="감사일기" address="thanks"/> */}
      </View>
    <View style={styles.btnView}>
<TouchableOpacity style={styles.btn} onPress={()=>(navigation as any).navigate("setting")}>
<Ionicons name="settings-outline" size={32} color="black" />
</TouchableOpacity>
    </View>
    </SafeAreaView>
    </>
  )
}

export default Home
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
     backgroundColor:'#D7A31F',

   width:width,
    height:height
  },
  btnView:{
    width:width-48,
    backgroundColor:'#D7A31F',
    position:'absolute',
    bottom:52,
    right:44,
    alignItems:'flex-end',
  },
  btn:{
    width:60,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:100,


  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
   color:'white',
   fontFamily:'Nunito-Bold'
  },
})