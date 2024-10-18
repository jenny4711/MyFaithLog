import { View, Text,TouchableOpacity,Dimensions,StyleSheet } from 'react-native'
import React,{useEffect} from 'react'
import ShowBible from './ShowBible'
import { useStorageContext } from '~/context/StorageContext';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
const {width} = Dimensions.get('window')
const BibleForm =
({
  category,
  fromPageRef,
  fromVerseRef,
  toPageRef,
  toVerseRef,
  // name,
  // setPage,
  // lang,page,
  // theBible,
  // setVerse,
  // verse,
  // setToPage,
  // toPage,
  // setToVerse,
  // toVerse,
  handleShowListener,
  handleShowContent,
  visible,
  setVisible,
  lang
  // showContent

}:any) => {
  const offset = useSharedValue(0);
  const {init,setInit,verse,setVerse,toVerse,setToVerse,page,setPage,toPage,setToPage,showContent,setShowContent,setName,name}=useStorageContext()
  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }]
  }));

useEffect(()=>{
  console.log('name',name)
},[name])


  return (
 <>
 <View style={category === 'thanks' || category === 'source' ? { display: 'none' } : { width: width , flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{  flexDirection: 'row', backgroundColor: '#E8751A', width: 80, height: 60, justifyContent: 'center', marginLeft: 5, alignItems: 'center', borderRadius: 10 }}>
              <ShowBible ref={fromPageRef} Ref2={fromVerseRef} setChange={setPage} value={page} lang={lang}  />
              <Text style={{ fontSize: 18 }}>{lang === 'Kr' ? '장' : 'ch'}</Text>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8751A', width: 80, height: 60, justifyContent: 'center', marginLeft: 3, alignItems: 'center', borderRadius: 10 }}>
              <ShowBible ref={fromVerseRef} Ref2={toPageRef} setChange={setVerse} value={verse} lang={lang}  />
              <Text style={{ fontSize: 18 }}>{lang === 'Kr' ? '절' : 'vs'}</Text>
            </View>
            <Text> ~</Text>
            <View style={lang === 'En' ? { display: 'none' } : {  flexDirection: 'row', backgroundColor: '#E8751A', width: 80, height: 60, justifyContent: 'center', marginLeft: 3, alignItems: 'center', borderRadius: 10 }}>
              <ShowBible ref={toPageRef} Ref2={toVerseRef} setChange={setToPage} value={toPage} lang={lang}  />
              <Text style={{ fontSize: 18 }}>{lang === 'Kr' ? '장' : 'ch'}</Text>
            </View>
            <View style={lang === 'En' ? { display: 'none' } : {  flexDirection: 'row', backgroundColor: '#E8751A', width: 80, height: 60, justifyContent: 'center', marginLeft: 3, alignItems: 'center', borderRadius: 10 }}>
              <ShowBible ref={toVerseRef} Ref2={null} setChange={setToVerse} value={toVerse} lang={lang}  />
              <Text style={{ fontSize: 18 }}>{lang === 'Kr' ? '절' : 'vs'}</Text>
            </View>
          </View>
         <View style={{width:width,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={category === 'thanks' || category === 'source' ? { display: 'none' } : { width: width - 48, marginBottom: 10, backgroundColor: 'white', height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 3 }} onPress={name === "목록" ? handleShowListener :handleShowContent}>
            <Text style={{ fontFamily: 'LineSeedKr-Bd', fontSize: 18 }}>{lang === 'En' ? 'Show Bible' : !visible ? `${name} 보기` : '말씀 닫기'}</Text>
          </TouchableOpacity>
          </View>
 
          {visible && (
        <>
          <Animated.ScrollView entering={SlideInDown.springify().damping(15)} exiting={SlideOutDown} style={[styles.sheet, translateY]}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={{ color: 'red' ,fontSize:18}}>X</Text>
            </TouchableOpacity>
            {showContent?.map((line: any, index: any) => (
              <View key={index} style={{ paddingBottom: 10 }}>
                <Text style={{ marginTop: 24, fontSize: 20, lineHeight: 34 }} key={index}>
                  {line.content}
                </Text>
              </View>
            ))}
            <View style={{ paddingBottom: 50 }} />
          </Animated.ScrollView>
        </>
      )}
 
 
 
 
 </>
  )
}

export default BibleForm
const styles=StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1
  },
  sheet: {
    backgroundColor: 'white',
    zIndex: 1,
    padding: 20,
    height: 350,
    width: '100%',
    position: 'absolute',
    bottom: -1 * 4.0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  dateSeleBox: {
 borderBottomWidth:0.5,borderBottomColor:'gray', width: width / 4 ,justifyContent:'center',alignItems:'center'
  }

})