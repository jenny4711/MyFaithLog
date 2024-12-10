import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, ScrollView,SafeAreaView } from 'react-native';
import React,{useEffect,useState,useRef} from 'react'
import { useNavigation } from '@react-navigation/native';
import { currentAvailableBible,bibleKrBc } from '~/utils/selectionArray';
import { useBibleFromChToCh } from '~/hooks/useFormData';
import { useBibleFromTo } from '~/hooks/useFormData';
import { useStorageContext } from '~/context/StorageContext';
import Octicons from '@expo/vector-icons/Octicons';
const {width,height} = Dimensions.get('window')
//성경 목록 보여주기
//목록을 선택하면 해당 성경 from장과 from절 선택 하기
//from장과 from절 선택하면 to장과 to절 선택하기
//선택하면 form 으로 이동하기
//form 에서는 선택한 성경과 장절을 보여주기

const ChooseBibleSec = () => {
const navigation = useNavigation()
const {init,setInit,verse,setVerse,toVerse,setToVerse,page,setPage,toPage,setToPage,showContent,setShowContent,setName,name}=useStorageContext()
const [closeName,setCloseName]=useState(false)
const [showVerse,setShowVerse]=useState(false)
const [itemGroup,setItemGroup]=useState<any>(null)
const [pg,setPg]=useState(0)
const [vs,setVs]=useState(0)
const verseRef=useRef(null)
const chapterRef=useRef(null)
const scrollViewRef=useRef(null) as any
const { data }: any = useBibleFromChToCh(name !=='목록' && page !=='' && verse !=='' && toPage !=='' && toVerse !==''  ? { title: name, bible: init, fromCh: page, fromVs: verse, toCh: toPage, toVs: toVerse } : []);
useEffect(()=>{
  if(data){
    console.log(data,'data-ChooseBibleSec')
    setShowContent(data)
  }
},[data])

useEffect(()=>{
  if(toVerse !==''){
    (navigation as any).navigate('form')
  }
},[toVerse])

useEffect(()=>{
  if(showVerse){  
    const verseCount = itemGroup[page.toString()];
  
    if(verseCount){
     
      setVs(verseCount)

    }
   


  }
},[showVerse])



// const scrollToInput = (inputRef: any,amt:any) => {
//   if (scrollViewRef.current) {
//     inputRef.current.measureLayout(
//       scrollViewRef.current,
//       (x: any, y: any) => {
//         scrollViewRef.current.scrollTo({ y: y - amt, animated: true });
//       },
//       (error: any) => console.log(error)
//     );
//   }
// };

const scrollToInput = (inputRef: any, amt: any) => {
  if (scrollViewRef.current) {
    inputRef.current.measureLayout(
      scrollViewRef.current,
      (x: any, y: any) => {
        console.log("Scroll target y:", y, "amt:", amt);
        const targetY = y + amt;
        console.log("Scrolling to:", targetY);
        scrollViewRef.current.scrollTo({ y: targetY, animated: true });
      },
      (error: any) => console.log(error)
    );
  }
};

const handleSetName = (item:any) => {
  setName(item?.title)
  setPg(item.pg)
  setInit(item.init)
  setItemGroup(item)
  setCloseName(true)

}

const handleSetPage=(item:any)=>{
  scrollToInput(chapterRef,200)
  if(page ===''){
    setPage(item.toString())
  }else if(page !=='' && toPage !==''){
    setPage(item.toString())
    setToPage('')
    setVerse('')
    setToVerse('')
  }else{
    setToPage(item.toString())
  }
  setShowVerse(true)

}


const handleSetVerse=(item:any)=>{
  scrollToInput(verseRef,-2011)
  if(verse ===''){
    setVerse(item.toString())
  }else if(verse !=='' && toVerse !==''){
    setVerse(item.toString())
    setToVerse('')
  }else{
    setToVerse(item.toString())
    
  }
  
}

 const resetBtn=()=>{
  setVerse('')
  setToVerse('')
  setPage('')
  setToPage('')
  setShowVerse(false)
  setCloseName(false)
  setName('목록')
  setPg(0)
  setVs(0)
  setInit('')
 
 }
console.log(page,'page')

  return (
    <SafeAreaView style={{flex:1,backgroundColor: '#E8751A',alignItems:'center'}}>
      <View style={{flexDirection:'row',width:width-48,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent:'center',position:'absolute',left:10}} >
        <Octicons name="chevron-left" size={24} color="white" />
        </TouchableOpacity>

{name !=="목록"? <Text style={{color:'white',fontSize:24,fontFamily:'LineSeedKr-Rg'}}>{name} {page} : {verse} 부터 {toPage}:{toVerse} 까지</Text>:<Text style={{fontSize:20,fontFamily:'LineSeedKr-Bd',color:'white',marginVertical:16}}>말씀 선택</Text>}
</View>
      <ScrollView ref={scrollViewRef} style={{width:width-48,marginTop:16}}>
        {!closeName &&currentAvailableBible.map((item,index)=>
          <View key={`bible=${index}`}>
          <TouchableOpacity  style={styles.bibleBox} onPress={()=>handleSetName(item)}>
            <Text style={{fontSize:20,fontFamily:'LineSeedKr-Rg'}}>{item.title}</Text>
          </TouchableOpacity>

         



          </View>
          

        )}
        {closeName && <Text style={{fontSize:20,fontFamily:'LineSeedKr-Bd',color:'white',marginVertical:16}}>말씀 나누기(장)</Text>}
 <View  style={{width:width-48,flexDirection:'row',flexWrap:'wrap'}}>

        {closeName && new Array(pg).fill(0).map((item,index)=>(
         <View key={`chapter-${index+1}`}>
         
          <TouchableOpacity ref={chapterRef}  style={[{alignItems:'center',justifyContent:'center',width:(width-48)/6-8,height:(width-48)/6-8,margin:8,borderRadius:24},Number(toPage)=== index+1||Number(page) === index+1.?{backgroundColor:'#E8751A'}:{backgroundColor:'#fff'}]} onPress={()=>handleSetPage(index+1)}>
            <Text style={[{fontSize:20,fontFamily:'LineSeedKr-Bd'},Number(toPage)===index+1||Number(page) === index+1?{color:'white'}:{color:'#000000'}]}>{index+1}</Text>
          </TouchableOpacity>
          </View>
         
        ))}
       {closeName&& <TouchableOpacity ref={verseRef} key={`bible-${vs}`}  style={{alignItems:'center',justifyContent:'center',width:(width-48)/6-8,height:(width-48)/6-8,backgroundColor:'#fff',margin:8,borderRadius:24}} onPress={()=>resetBtn()}>
            <Text style={{fontSize:16,fontFamily:'LineSeedKr-Bd'}}>초기화</Text>
          </TouchableOpacity>}
         </View>
         {showVerse && <Text style={{fontSize:24,fontFamily:'LineSeedKr-Bd',marginVertical:16,color:'white'}}>구절 탐색(절)</Text>}
         <View style={{width:width-48,flexDirection:'row',flexWrap:'wrap'}}>



         {showVerse && new Array(vs).fill(0).map((item,index)=>(
          <View key={`verse-${index+3}`}>
          
            <TouchableOpacity  style={[{justifyContent:'center',alignItems:'center',width:(width-48)/6-8,height:(width-48)/6-8,margin:8,borderRadius:24},Number(verse)===index+1 || Number(toVerse)===index+1?{backgroundColor:'#E8751A'}:{backgroundColor:'#fff'}]} onPress={()=>handleSetVerse(index+1)}>
              <Text style={[{fontSize:20,fontFamily:'LineSeedKr-Bd'},Number(toVerse)===index+1||Number(verse) === index+1?{color:'white'}:{color:'#000000'}]}>{index+1}</Text>
            </TouchableOpacity>
            </View>
         ))}
          {showVerse &&<TouchableOpacity  style={{alignItems:'center',justifyContent:'center',width:(width-48)/6-8,height:(width-48)/6-8,backgroundColor:'#fff',margin:8,borderRadius:24}} onPress={()=>resetBtn()}>
            <Text style={{fontSize:16,fontFamily:'LineSeedKr-Bd'}}>초기화</Text>
          </TouchableOpacity>}
</View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChooseBibleSec

const styles = StyleSheet.create({
  bibleBox:{
    backgroundColor:'white',
    height:60,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    marginBottom:10
  }
})