import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { currentAvailableBible } from '~/utils/selectionArray';
import { useBibleFromChToCh } from '~/hooks/useFormData';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useStorageContext } from '~/context/StorageContext';
import { getAIResponse } from '~/utils/ai';
import BibleSelector from '~/components/BibleSelector';
import { findFromChToCh } from '~/utils/ai';
const { width, height } = Dimensions.get('window');


const ChooseBibleSec = () => {
  const navigation = useNavigation();
  const {
    setAiAnswer,
    init,
    setInit,
    verse,
    toVerse,
showContent,
    setShowContent,
    page,

    toPage,
aiAnswer,
    name,
    findBible,
    setFindBible,
  } = useStorageContext();
  const [closeName, setCloseName] = useState(false);
  const [showVerse, setShowVerse] = useState(false);
  const [itemGroup, setItemGroup] = useState<any>([]);
  const [showBible, setShowBible] = useState(false);
  const [pgs, setPgs] = useState([]);
  const [vsTo, setVsTo] = useState(0);
  const [vs, setVs] = useState(0);
  const [point,setPoint]=useState<any>([])
const [savedContent,setSavedContent]=useState<any>([])

  async function getBible() {
    if (!toVerse) {
      return; // 실행 중단
    }

    const result = await findFromChToCh({
      title: name,
      bible: init,
      fromCh: page,
      fromVs: verse,
      toCh: toPage,
      toVs: toVerse,
    });

    if (Array.isArray(result)) {
      const verses = result.map((item: any) => item.content);
      
      setShowContent(verses);
      
    } else {
      console.error('API response is not an array!', result);
      setItemGroup([]); // 안전하게 빈 배열 설정
    }
  }

  useEffect(() => {
   
    if (findBible) {
      getBible();
      setFindBible(!findBible);
    } else {
      return;
    }
  }, [findBible]);

  useEffect(() => {
    const findPg: any = currentAvailableBible.filter((item: any) => {
      return item?.title === name;
    });
  
    const arr: any = Array.from({ length: findPg[0]?.pg }, (_, i) => ({
      label: `${i + 1}장`,
      value: i + 1,
    }));

    setPgs(arr);
    setItemGroup(findPg[0]);
    setInit(findPg[0]['init']);
  }, [name, verse, toVerse]);

  useEffect(() => {
    if (name !== '') {
      const verseCount = itemGroup[page.toString()];

      setVs(verseCount);
    }
  }, [name, page,itemGroup]);

  useEffect(() => {
    if (toPage !== 0) {
      const toVerseCount = itemGroup[toPage];
   

      setVsTo(toVerseCount);
    }
  }, [toPage, itemGroup]);


  useEffect(()=>{
    async function getAiStory(){
      const res = await getAIResponse('Kr', page, verse, name, toPage, toVerse);
   
      setAiAnswer(res)
    }
    if(page>0 && verse>0){
      getAiStory()
    }
  
  },[verse,page,toPage,toVerse])

  useEffect(()=>{console.log(savedContent,'savedContent')},[savedContent,point])

  function saveVerse(item:any){
    try{
      let obj={
        name,
        page,
        content:item

      }
      if(savedContent.includes(item)){
        const data = point.filter((p: any) => p.content !== item);
      setPoint(data);

      const dataArr = savedContent.filter((dt: any) => dt !== item);
      setSavedContent(dataArr);

      return; // ✅ 이미 삭제했으므로 아래 코드 실행 방지
      }
      setPoint((prv:any) => [obj, ...prv]);
      setSavedContent((prev:any)=>[item,...prev])
    }catch(err){
      console.log(err,'savedCotent')
    }
  }
  



  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#D7A31F', alignItems: 'center' }}
    >
     
      <View style={{ marginTop: 50 ,alignItems:'flex-start',justifyContent:'flex-start',width:width-48}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:width-220}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
        </View>
      </View>
      <BibleSelector
        vsTo={vsTo}
        vs={vs}
        pg={pgs}
        vss={itemGroup}
        setShowBible={setShowBible}
        getBible={getBible}
      />

      <ScrollView 
      showsVerticalScrollIndicator={false}
      
      >
        <View style={{ width:width-60, marginTop: 20 }}>
         {aiAnswer !=="" && <Text style={{fontSize:20,fontFamily:"LotteBd",marginBottom:16}}>요약</Text>}
<View>
  <Text style={{fontFamily:'LineSeedKR-Rg',fontSize:16,lineHeight:34}}>{aiAnswer}</Text>
</View>
        </View>
        <View style={{ width: width - 60, marginTop: 40, padding: 10 }}>
      {showContent.length >0 &&  <Text style={{fontSize:20,fontFamily:"LotteBd",marginBottom:16}}>성경 말씀</Text>}
          {Array.isArray(showContent) && showContent.length > 0 ? (
            showContent.map((item: any, index: number) => (
              <TouchableOpacity   onPress={()=>saveVerse(item)}>
              <Text
                key={index}
                style={{ color:savedContent.includes(item)? '#fff':'black', fontSize: 17, lineHeight: 34 ,backgroundColor: savedContent.includes(item) ? "#023e8a" : "transparent",padding:10 }}
               
              >
                {item}
              </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: 'black', fontSize: 17 }}>
              No data available
            </Text>
          
            
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseBibleSec;

const styles = StyleSheet.create({
  bibleBox: {
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});





