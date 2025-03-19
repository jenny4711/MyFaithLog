import React, { useState ,useEffect,useRef} from 'react';
import { View, Text, Dimensions,Keyboard,TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { useStorageContext } from '~/context/StorageContext';

const { width } = Dimensions.get('window');

const BibleSelector = ({vsTo,vs,pg,vss,setShowBible,getBible}:any) => {

const {name,setName,verse,setVerse,toVerse,setToVerse,page,setPage,setToPage,toPage,setInit,init,setFindBible,setShowContent,setAiAnswer}=useStorageContext()
const safeVss = vss || {};  // null이면 빈 객체로 대체

const [fromVs, setFromVs] = useState<any>([]);
const [toVs, setToVs] = useState<any>([]);
const toVsRef=useRef(null) as any
const vsRef=useRef(null) as any
const toPgRef=useRef(null) as any


useEffect(()=>{
  if(name !== ""){
   
    setInit(safeVss["init"])
  }
},[name])
useEffect(() => {
    setFromVs(
      Array.from({ length: vs}, (_, i) => ({
        label: `${i + 1}절`,
        value: i + 1,
      }))
    );
  
}, [ page,vs]);


useEffect(() => {


    setToVs(
      Array.from({ length: vsTo }, (_, i) => ({
        label: `${i + 1}절`,
        value: i + 1,
      }))
    );
  
}, [toPage,vsTo]);


  const reset=()=>{
    setVerse('')
    setToVerse('')
    setPage('')
    setToPage('')
    setShowContent([])
    setAiAnswer('')
    
  }
 

  return (
    <View style={{ alignItems: 'center', paddingTop: 20 ,paddingBottom:20}}>
      {/* <Text>{name}</Text> */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* 장 선택 */}
        <RNPickerSelect
           onValueChange={(value) => {
            if(value){
               setPage(value);
                      
            
            }
           
             // ✅ iOS에서 선택 후 키보드 자동 닫기
          }}
          items={pg}
          placeholder={{ label: '장', value: null }}
          onClose={(wasDonePressed) => {
            if (wasDonePressed) {
              vsRef.current?.togglePicker();
            
            } else {
              console.log("❌ Picker가 강제 닫혔습니다! (화면 클릭 등)");
            }
          }}
          style={{
            inputIOS: {
              backgroundColor: 'white',
              color: 'black',
              paddingVertical: 10,
              paddingHorizontal: 5,
              width: width -365, // 4개가 한 줄에 들어가도록 조정
              height: 44,
              textAlign: 'center',
              marginHorizontal: 5, // 간격 추가
              borderRadius: 10,
              fontWeight: 'bold',
              fontSize: 16,
            },
            placeholder: {
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            },
            modalViewBottom: {
              backgroundColor: '#ffffff' // iOS 하단 선택창 배경
            },
            modalViewMiddle: {
              backgroundColor: '#ffffff' // iOS 중간 선택창 배경
            },
          }}
          onDonePress={() => Keyboard.dismiss()} 
          pickerProps={{
            itemStyle: { color: 'black' }, // ✅ Done 버튼 및 선택 항목 색상 변경 (iOS)
          }}
        />

        {/* 절 선택 */}
        <RNPickerSelect
        ref={vsRef}
          onValueChange={(value) => setVerse(value)}
          items={fromVs}
          placeholder={{ label: '절', value: null }}
          style={{inputIOS: {
            backgroundColor: 'white',
            color: 'black',
            paddingVertical: 10,
            paddingHorizontal: 5,
            width: width -365, 
            height: 44,
            textAlign: 'center',
            marginHorizontal: 5, 
            borderRadius: 10,
            fontWeight: 'bold',
            fontSize: 16,
          },
          placeholder: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          },
        
          modalViewBottom: {
            backgroundColor: '#ffffff', 
          },
          modalViewMiddle: {
            backgroundColor: '#ffffff', 
          },
        
        }}
        onClose={(wasDonePressed) => {
          if (wasDonePressed) {
            toPgRef.current?.togglePicker();
          
          } else {
           
          }
        }}
        />
        <View style={{justifyContent:'center'}}>
        <Text style={{fontSize:20}}>~</Text>
        </View>

        {/* 장 선택 */}
        <RNPickerSelect
        ref={toPgRef}
          onValueChange={(value) =>  setToPage(value)}
          items={pg}
          placeholder={{ label: '장', value: null }}
          style={{
            inputIOS: {
              backgroundColor: 'white',
              color: 'black',
              paddingVertical: 10,
              paddingHorizontal: 5,
              width: width -365, // 4개가 한 줄에 들어가도록 조정
              height: 44,
              textAlign: 'center',
              marginHorizontal: 5, // 간격 추가
              borderRadius: 10,
              fontWeight: 'bold',
              fontSize: 16,
            },
            placeholder: {
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            },
            modalViewBottom: {
              backgroundColor: '#ffffff', // iOS 하단 선택창 배경
            },
            modalViewMiddle: {
              backgroundColor: '#ffffff', // iOS 중간 선택창 배경
            },
          }}
          onClose={(wasDonePressed) => {
            if (wasDonePressed) {
              toVsRef.current?.togglePicker();
            
            } else {
              console.log("❌ Picker가 강제 닫혔습니다! (화면 클릭 등)");
            }
          }}
        />

        {/* 절 선택 (끝) */}
        <RNPickerSelect
          onValueChange={(value) =>setToVerse(value) }
          onClose={async(wasDonePressed) => {
            console.log(toPage,page,verse,toVerse,'toPage,page,verse,toVerse')
            if(wasDonePressed && toPage !=='' && page !=='' && verse !=='' && toVerse !==''){
         setFindBible(true)
            }
         
          
          }}
          ref={toVsRef}
          items={toVs}
          placeholder={{ label: '끝 절', value: null }}
          style={{inputIOS: {
            backgroundColor: '#ffffff',
            color: 'black',
            paddingVertical: 10,
            paddingHorizontal: 5,
            width: width -365, // 4개가 한 줄에 들어가도록 조정
            height: 44,
            textAlign: 'center',
            marginHorizontal: 5, // 간격 추가
            borderRadius: 10,
            fontWeight: 'bold',
            fontSize: 16,
          },
          placeholder: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          modalViewBottom: {
            backgroundColor: '#ffffff', // iOS 하단 선택창 배경
          },
          modalViewMiddle: {
            backgroundColor: '#ffffff', // iOS 중간 선택창 배경
          },
        }}
        />
        <TouchableOpacity style={{backgroundColor:'white',padding:10,borderRadius:10,marginLeft:10,justifyContent:'center',alignItems:'center'}} onPress={()=>reset()}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BibleSelector;

