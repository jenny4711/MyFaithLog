import { View, Text ,Dimensions,SafeAreaView, StyleSheet,TouchableOpacity,Platform} from 'react-native'
import React,{useState,useEffect} from 'react'
import MenuBtns from '~/components/home/MenuBtns'
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import Head from 'expo-router/head';
const {width,height} = Dimensions.get('window')
const Home = () => {
  const navigation = useNavigation()
  return (
    <>
    <Head>
      <title>My Faith Log</title>
      <meta name="description" content="My Faith Log" />
   </Head>
    <SafeAreaView style={styles.container}>
      <View>
      <MenuBtns title="묵상일지" address="dailyqt"/>
      <MenuBtns title="주일말씀" address="sunday"/>
      <MenuBtns title="나의 그룹" address="myGroup"/>
      {/* <MenuBtns title="자료실" address="source"/>
      <MenuBtns title="감사일기" address="thanks"/> */}
      </View>
    <View style={styles.btnView}>
<TouchableOpacity style={styles.btn} onPress={()=>(navigation as any).navigate('chooseBibleSec')}>
<Fontisto name="plus-a" size={18} color={"black"} />
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
    backgroundColor:'#E8751A',
   width:width,
    height:height
  },
  btnView:{
    width:width-48,
    backgroundColor:'#E8751A',
    position:'absolute',
    bottom:40,
    alignItems:'flex-end',
  },
  btn:{
    width:60,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:100,


  }
})