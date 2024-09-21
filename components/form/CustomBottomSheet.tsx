import { View, StyleSheet, Text, Button ,Dimensions,TouchableOpacity} from 'react-native';
import React, {useCallback, forwardRef, useMemo } from 'react';
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import BottomSheet, { useBottomSheet  } from '@gorhom/bottom-sheet';
import { bibleKrBc } from '~/utils/selectionArray';
const {width} = Dimensions.get('window')
export type Ref = BottomSheet;

interface Props {
  title: string;
  name: string;
  setChange: (name: string) => void;
  setInit: (init: string) => void;
  showContent: any;
}



const CustomBottomSheet = forwardRef<Ref, Props>(({setInit,title,setChange,showContent},ref) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  console.log(showContent,'showContent')
  const handleNameBtn = (name: string,init:string) => {
    setChange(name)
    setInit(init) as any
   return (ref as React.MutableRefObject<BottomSheet>).current?.close();
    
    }

  const data = useMemo(
    () =>
      bibleKrBc
        // .fill(0)
        .map((item, index) => item),
    []
  );
  
  const renderItem = useCallback(
    
    (item:any) => (
      <TouchableOpacity
       key={item.title} style={styles.itemContainer} onPress={()=>handleNameBtn(item.value,item.init)}>
        <Text style={{color:'#000000',fontSize:20}}>  {item.title}</Text>
      </TouchableOpacity>
    ),
    []
  );


// const contentData=useMemo(()=>showContent,[])

// const renderContent = useCallback((value:any) => {
//   return (
//     <View style={styles.input}>
//       <Text>{value.content}</Text>
//     </View>
//   );
// }, []);


  return (
  
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: '#fff' }}
      backgroundStyle={{ backgroundColor: '#ffffff' }}>
     
      <BottomSheetScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        {data.map(renderItem)}
      </BottomSheetScrollView>
     
    </BottomSheet>
    
  );
});
export default CustomBottomSheet;
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#1d0f4e',
  },
  scrollViewContentContainer: {
   alignItems: 'center',
    paddingBottom: 20, // 마지막 항목이 잘 보이도록 패딩 추가
  },
  footerContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1d0f4e',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    // margin: 6,
   borderBottomWidth:0.5,
    borderColor:'gray',
    width: width - 48,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
});



