// import { View, StyleSheet, Text, Button ,Dimensions,TouchableOpacity} from 'react-native';
// import React, {useCallback, forwardRef, useMemo ,useState} from 'react';
// import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
// import BottomSheet, { useBottomSheet  } from '@gorhom/bottom-sheet';
// import { bibleKrBc ,currentAvailableBible} from '~/utils/selectionArray';
// const {width} = Dimensions.get('window')
// export type Ref = BottomSheet;

// interface Props {
//   title: string;
//   name: string;
//   setChange: (name: string) => void;
//   setInit: (init: string) => void;
//   showContent: any;
// }



// const CustomBottomSheet = forwardRef<Ref, Props>(({setInit,title,setChange,showContent},ref) => {
//   const snapPoints = useMemo(() => ['25%', '50%','75%'], []);
//   const [toCh,setToCh]=useState('')
//   const [toVs,setToVs]=useState('')
//   const [fromCh,setFromCh]=useState('')
//   const [fromVs,setFromVs]=useState('')
//   const [showTo,setShowTo]=useState(false)
//   const [showFrom,setShowFrom]=useState(false)
//   console.log(typeof showContent,'showContent@@')

//   const data = useMemo(
//     () =>
//       showContent
//         .fill(0)
//         .map((item:any, index:any) => item + index),
//     []
//   );
//   const renderItem = useCallback(
   
//     (item:any) => (
     
//       <View key={item?.verse} style={styles.itemContainer}>
//         <Text style={{color:'red'}}>{item?.content}</Text>
//       </View>
//     ),
//     []
//   );
 
//     const handleNameBtn = (name: string,init:string) => {
//       setChange(name)
//       setInit(init) as any
//      return (ref as React.MutableRefObject<BottomSheet>).current?.close();
      
//       }

 


//   return (
  
//     <BottomSheet
//       ref={ref}
//       index={0}
//       snapPoints={snapPoints}
//       enablePanDownToClose={true}
//       handleIndicatorStyle={{ backgroundColor: '#fff' }}
//       backgroundStyle={{ backgroundColor: '#ffffff' }}>
     
//       <BottomSheetScrollView contentContainerStyle={styles.scrollViewContentContainer}>
//       {data.map(renderItem)}
//       </BottomSheetScrollView>
     
//     </BottomSheet>
    
//   );
// });
// export default CustomBottomSheet;
// const styles = StyleSheet.create({
//   headerContainer: {
//     alignItems: 'center',
//     padding: 20,
//     // backgroundColor: '#1d0f4e',
//   },
//   scrollViewContentContainer: {
//    alignItems: 'center',
//     paddingBottom: 20, // 마지막 항목이 잘 보이도록 패딩 추가
//   },
//   footerContainer: {
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#1d0f4e',
//   },
//   containerHeadline: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   itemContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 16,
//     // margin: 6,
//    borderBottomWidth:0.5,
//     borderColor:'gray',
//     width: width - 48,
//   },
//   input: {
//     marginTop: 8,
//     marginBottom: 10,
//     borderRadius: 10,
//     fontSize: 16,
//     lineHeight: 20,
//     padding: 8,
//     backgroundColor: 'rgba(151, 151, 151, 0.25)',
//   },
// });



import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useCallback, forwardRef, useMemo, useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
const { width } = Dimensions.get('window');

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

  // 데이터가 배열인지 확인하고 렌더링
  // if (!Array.isArray(showContent)) {
  //   return (
  //     <View>
  //       <Text>데이터가 유효하지 않습니다. 배열이 필요합니다.</Text>
  //     </View>
  //   );
  // }
console.log(showContent,'showContent@@')
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
      {showContent?.map((line: any, index: any) => (
              <View key={`content-${index}`} style={{ paddingBottom: 10 }}>
                <Text style={{ marginTop: 24, fontSize: 20, lineHeight: 34 }} key={index}>
                  {line.content}
                </Text>
              </View>
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
