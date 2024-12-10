import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useCallback, forwardRef, useMemo, useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
const { width } = Dimensions.get('window');
import { useStorageContext } from '~/context/StorageContext';
import { getAIResponse } from '~/utils/ai';
export type Ref = BottomSheet;

interface Props {
  title: string;
  name: string;
  setChange: (name: string) => void;
  setInit: (init: string) => void;
  showContent: any; // showContent는 배열로 예상됩니다.
}

const CustomBottomSheet = forwardRef<Ref, Props>(({ setInit, title, setChange, showContent }, ref) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);
const {name,verse,page,toPage,toVerse,aiAnswer,setAiAnswer,lang,setLang}=useStorageContext()
const [showAi,setShowAi]=useState(false)
const handleStoryFromAI=async()=>{
  if(aiAnswer !==""){
  setShowAi(!showAi)
  }
  if(aiAnswer ===""){
    const result = await getAIResponse(lang,page,verse,name,toPage,toVerse)
    setAiAnswer(result)
    console.log(result,'result')
  }
    
 
 
  
    }

  const renderItem = useCallback(
    (item: any, index: number) => (
      <TouchableOpacity
        key={item.id || index} // 고유한 키값이 필요합니다.
        style={styles.itemContainer}
        // onPress={() => handleNameBtn(item.groupName, item.id)}
      >
        <Text style={{ color: 'black', fontSize: 20 }}>Group Name: {index}</Text>
        {/* <Text style={{ color: 'gray', fontSize: 16 }}>Memo: {item.memo}</Text> */}
      </TouchableOpacity>
    ),
    []
  );

  const handleNameBtn = (name: string, init: string) => {
    setChange(name);
    setInit(init);
    return (ref as React.MutableRefObject<BottomSheet>).current?.close();
  };

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: '#fff' }}
      backgroundStyle={{ backgroundColor: '#ffffff' }}
    >
      <BottomSheetScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={{flexDirection:'row'}}>
          <Text>{name} {page}장 {verse}절 ~ {toPage}장 {toVerse}절</Text>
          <TouchableOpacity onPress={handleStoryFromAI} style={{position:'absolute',zIndex:1,left:210}}>
          <Text>{aiAnswer ===""?`${page}장 요약`:(showAi?"요약 닫기":"요약 보기")}</Text>
          </TouchableOpacity>
        </View>
        {aiAnswer !=="" && showAi && <Text style={{ marginTop: 24, fontSize: 20, lineHeight: 34 }}>{aiAnswer}</Text>}
      {showContent?.map((line: any, index: any) => (
              <TouchableOpacity activeOpacity={1} key={`content-${index}`} style={{ paddingBottom: 10 }}>
                <Text style={{ marginTop: 24, fontSize: 20, lineHeight: 34 }} key={index}>
                  {line.content}
                </Text>
              </TouchableOpacity>
            ))}


      </BottomSheetScrollView>
    </BottomSheet>
  );
});

export default CustomBottomSheet;

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    alignItems: 'center',
    paddingBottom: 20, // 마지막 항목이 잘 보이도록 패딩 추가
    paddingHorizontal: 24,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    width: width - 48,
  },
});
