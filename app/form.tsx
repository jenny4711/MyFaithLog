import { View, Text, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView, Keyboard, TextInput, Platform, ScrollView, Alert, Pressable, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from 'expo-router';
import app from '../app.json';
import { useBibleFromTo, useBibleFromChToCh } from '~/hooks/useFormData';
import DatePicker from '~/components/form/DatePicker';
import SelectionGroup from '~/components/form/SelectionGroup';
import Selection from '~/components/form/Selection';
import { getAIResponse } from '~/utils/ai';
import { dayList,monthList,yearList } from '~/utils/selectionArray';
import { useStorageContext } from '~/context/StorageContext';
import FirstView from '~/components/form/FirstView';
import { bibleEnAc, bibleEnBc,  bibleKrBc, langArr, bibleArrEn, bibleArrKr } from '~/utils/selectionArray';
import DailyForm from '~/components/form/DailyForm';
import SundayForm from '~/components/form/SundayForm';
import ShowBible from '~/components/form/ShowBible';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useSaveData ,useGroupListData} from '~/hooks/useFormData';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBottomSheet, { Ref } from '~/components/form/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { addDailyQtToGroup } from '~/utils/fireStoreFn';
import Head from 'expo-router/head';
import DataPickerW from '~/components/web/DataPickerW';
import StatusCheck from '~/components/form/StatusCheck';
const { width, height } = Dimensions.get('window');

const Form = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [fullDate, setFullDate] = useState('');
  const [meditation, setMeditation] = useState('');
  const [summary, setSummary] = useState('');
  const [pray, setPray] = useState('');
  const [application, setApplication] = useState('');
  const [lang, setLang] = useState('');
  const [name, setName] = useState('목록');
  const [toName, setToName] = useState('');
  const [theBible, setTheBible] = useState('The New Testament');
  const [verse, setVerse] = useState<any>('');
  const [toVerse, setToVerse] = useState<any>('');
  const [page, setPage] = useState<any>('');
  const [toPage, setToPage] = useState<any>('');
  const [category, setCategory] = useState<any>('');
  const [photo, setPhoto] = useState('');
  const [showDone, setShowDone] = useState(true);
  const [init, setInit] = useState('exo') as any;
  const [showContent, setShowContent] = useState([]) as any || [];
  const [note, setNote] = useState('');
  const [checkStatus,setCheckStatus]=useState([])
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [showList, setShowList] = useState(false);
  const [saved,setSaved]=useState(false)
  const scrollViewRef = useRef(null) as any;
  const medRef = useRef<TextInput>(null);
  const appRef = useRef<TextInput>(null);
  const prayRef = useRef<TextInput>(null);
  const toVerseRef = useRef<TextInput>(null);
  const toPageRef = useRef<TextInput>(null);
  const fromVerseRef = useRef<TextInput>(null);
  const fromPageRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const addMutation = useSaveData({ date, category });
  const bottomSheetRef = useRef<BottomSheet>(null);
const [showDate,setShowDate]=useState(false)
  const [visible, setVisible] = useState(false);
  const offset = useSharedValue(0);
  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }]
  }));

  const { data }: any = useBibleFromChToCh(visible ? { title: name, bible: init, fromCh: page, fromVs: verse, toCh: toPage, toVs: toVerse } : []);


useEffect(()=>{
  if(saved && checkStatus.length>0){
    checkStatus.map(async(item:any)=>{
      await addDailyQtToGroup({groupName:item,date:fullDate,category:category})
    })
    setSaved(false)
    setCategory('');
    setCheckStatus([])
    setFullDate('');
  }else if(saved){
    setSaved(false)
    setCategory('');
    setCheckStatus([])
    setFullDate('');

  }
},[checkStatus,saved])




useEffect(()=>{
 async function saveDate(){
  if(date!==''&&month!==''&&year!==''){
    setFullDate(`${month}-${date}-${year}`)
    setShowDate(false)
    await AsyncStorage.setItem('date',`${month}-${date}-${year}`)
  }

 }
saveDate()
},[date,month,year])


  useEffect(() => {
    if (visible) {
      setShowContent(data);
    }
  }, [visible, data]);

  useEffect(() => {
    if (showContent !== undefined) {
      setContent(showContent.map((line: any) => line.content));
    } else {
      console.log('no content!!!!!!!!');
    }
  }, [showContent]);

  const scrollToInput = (inputRef: any) => {
    if (scrollViewRef.current) {
      inputRef.current.measureLayout(
        scrollViewRef.current,
        (x: any, y: any) => {
          scrollViewRef.current.scrollTo({ y: y - 100, animated: true });
        },
        (error: any) => console.log(error)
      );
    }
  };

  useEffect(() => {
    const getLang = async () => {
      const langu: any = await AsyncStorage.getItem('lang');
      setLang(langu);
    };
    getLang();
  }, []);

  useEffect(() => {
    console.log(photo, 'photo');
    console.log(content, 'content');
  }, [photo, content]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleShowListener = () => {
    if (name === '목록' ) {
      setShowList(true);
    }
  }

  const handleShowContent = async () => {
    try {
     
      if (showContent !== undefined) {
        setVisible(!visible);
        // setShowList(true)
      } else {
        if (lang === '') {
          Alert.alert('Please select the language');
          return;
        }
        if (name === '') {
          Alert.alert('Please select the Bible');
          return;
        }
        if (page === '') {
          Alert.alert('Please enter the page number');
          return;
        }
        if (verse === '') {
          Alert.alert('Please enter the verse number');
          return;
        }
        if (theBible === '') {
          Alert.alert('Please select the Bible');
          return;
        }
        setVisible(true);
      }
    } catch (error) {
      console.log(error, 'error-handleShowContent');
    }
  };

  const handleSaveBtn = async () => {
    try {
      if (category === '') {
        Alert.alert('Please select the category');
        return;
      }
      setSaved(true)
      const date = await AsyncStorage.getItem('date');
      const address = `${name}-${page}-${verse} `;
      addMutation.mutate({ category, note, photo, date:fullDate, title, content, meditation, application, pray, name, address,group:checkStatus });
    
      
      setVerse('');
      setPage('');
      setToVerse('');
      setToPage('');
      setTitle('');
      setMeditation('');
      setApplication('');
      setPray('');
      setPhoto('');
      setNote('');
      setContent([]);
     
      setMonth('');
      setYear('');
      setLang('');
      setTheBible('');
      setName('');
      
      setDatePickerVisibility(false);
      
      return (navigation as any).navigate('home');
    } catch (error) {
      console.log(error, 'error-handleSaveBtn');
    }
  };

  useEffect(() => {
    console.log(lang, 'lang');
  }, [lang]);
console.log(checkStatus,'checkStatus')
  return (
    <>
     <Head>
      <title>My Faith Log</title>
      <meta name="description" content="My Faith Log" />
   </Head>
    <View style={[keyboardVisible ? styles.containerWithKeyboard : styles.container]}>
      <View style={{width:width}}>
        <FirstView category={category} setCategory={setCategory} lang={lang} setLang={setLang} setTheBible={setTheBible} theBible={theBible} />
      </View>
      <ScrollView ref={scrollViewRef} style={{ height: height, paddingVertical: 10 }}>
        <KeyboardAvoidingView style={{justifyContent:'center'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.select({ ios: -500, android: 80 })}>
          <View style={{ width:width,alignItems:'center'  }}>
           {Platform.OS=== "ios"? <DatePicker
              date={date}
              setDate={setDate}
              month={month}
              fullDate={fullDate}
              setFullDate={setFullDate}
              setMonth={setMonth}
              year={year}
              setYear={setYear}
              title={lang === 'Kr' ? '날짜 선택' : 'Select Date'}
              isDatePickerVisible={isDatePickerVisible}
              setDatePickerVisibility={setDatePickerVisibility}
            />: 
            <TouchableOpacity onPress={()=>setShowDate(!showDate)}>
              <Text>{date !== ''&& month !=="" && year !==""?fullDate:"날짜 선택"}</Text>
            </TouchableOpacity>
            
            
            
            }
          </View>

          <View style={{width:width,alignItems:'center'}}>
            <TextInput
              style={{ width: width - 48, height: 60, backgroundColor: 'white', padding: 10, borderRadius: 10, marginVertical: 10 }}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              multiline={true}
            />
          </View>

          <View style={category === 'thanks' || category === 'source' ? { display: 'none' } : { width: width , flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{  flexDirection: 'row', backgroundColor: '#E8751A', width: 80, height: 60, justifyContent: 'center', marginLeft: 5, alignItems: 'center', borderRadius: 10 }}>
              <ShowBible ref={fromPageRef} Ref2={fromVerseRef} setChange={setPage} value={page} lang={lang} theBible={theBible} />
              <Text style={{ fontSize: 16 }}>{lang === 'Kr' ? '장' : 'ch'}</Text>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8751A', width: 80, height: 60, justifyContent: 'center', marginLeft: 3, alignItems: 'center', borderRadius: 10 }}>
              <ShowBible ref={fromVerseRef} Ref2={toPageRef} setChange={setVerse} value={verse} lang={lang} theBible={theBible} />
              <Text style={{ fontSize: 16 }}>{lang === 'Kr' ? '절' : 'vs'}</Text>
            </View>
            <Text> ~</Text>
            <View style={lang === 'En' ? { display: 'none' } : {  flexDirection: 'row', backgroundColor: '#E8751A', width: 80, height: 60, justifyContent: 'center', marginLeft: 3, alignItems: 'center', borderRadius: 10 }}>
              <ShowBible ref={toPageRef} Ref2={toVerseRef} setChange={setToPage} value={toPage} lang={lang} theBible={theBible} />
              <Text style={{ fontSize: 16 }}>{lang === 'Kr' ? '장' : 'ch'}</Text>
            </View>
            <View style={lang === 'En' ? { display: 'none' } : {  flexDirection: 'row', backgroundColor: '#E8751A', width: 80, height: 60, justifyContent: 'center', marginLeft: 3, alignItems: 'center', borderRadius: 10 }}>
              <ShowBible ref={toVerseRef} Ref2={null} setChange={setToVerse} value={toVerse} lang={lang} theBible={theBible} />
              <Text style={{ fontSize: 16 }}>{lang === 'Kr' ? '절' : 'vs'}</Text>
            </View>
          </View>
         <View style={{width:width,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={category === 'thanks' || category === 'source' ? { display: 'none' } : { width: width - 48, marginBottom: 10, backgroundColor: 'white', height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 3 }} onPress={name === "목록" ? handleShowListener :handleShowContent}>
            <Text style={{ fontFamily: 'LineSeedKr-Bd', fontSize: 16 }}>{lang === 'En' ? 'Show Bible' : !visible ? `${name} 보기` : '말씀 닫기'}</Text>
          </TouchableOpacity>
          </View>

          {category === 'sundayQt' || category === 'thanks' || category === 'source' ? (
            <SundayForm note={note} setNote={setNote} photo={photo} setPhoto={setPhoto} showDone={showDone} category={category} />
          ) : (
            <DailyForm setMeditation={setMeditation} setApplication={setApplication} setPray={setPray} meditation={meditation} application={application} pray={pray} lang={lang} medRef={medRef} appRef={appRef} prayRef={prayRef} scrollToInput={scrollToInput} />
          )}
         <View>
          <StatusCheck checkStatus={checkStatus} setCheckStatus={setCheckStatus} />
         </View>
          <View style={{width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={handleSaveBtn} style={styles.saveBtn}>
            <Text>Save</Text>
          </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      {visible && (
        <>
          <Animated.ScrollView entering={SlideInDown.springify().damping(15)} exiting={SlideOutDown} style={[styles.sheet, translateY]}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={{ color: 'red' }}>X</Text>
            </TouchableOpacity>
            {showContent?.map((line: any, index: any) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={{ marginTop: 24, fontSize: 20, lineHeight: 34 }} key={index}>
                  {line.content}
                </Text>
              </View>
            ))}
            <View style={{ marginBottom: 50 }} />
          </Animated.ScrollView>
        </>
      )}

{showDate && (
       <>
       <Animated.View entering={SlideInDown.springify().damping(15)} exiting={SlideOutDown} style={[styles.sheet, translateY]}>
         <View style={{ flexDirection: 'row' }}>
           {/* 첫 번째 ScrollView */}
           <ScrollView style={{ height: 300 }}>
             {monthList?.map((item: any, index: any) => (
               <View key={index} style={{ marginBottom: 10 }}>
                 <TouchableOpacity onPress={()=>setMonth(item.value)} style={styles.dateSeleBox} key={index}>
                   <Text style={{  fontSize: 20, lineHeight: 34, color: 'black' }} key={index}>
                     {item.label}
                   </Text>
                 </TouchableOpacity>
               </View>
             ))}
           </ScrollView>
   
           {/* 두 번째 ScrollView */}
           <ScrollView style={{ height: 300 }}>
             {dayList?.map((item: any, index: any) => (
               <View key={index} style={{ marginBottom: 10 }}>
                 <TouchableOpacity onPress={()=>setDate(item.value)} style={styles.dateSeleBox} key={index}>
                   <Text style={{  fontSize: 20, lineHeight: 34, color: 'black' }} key={index}>
                     {item.label}
                   </Text>
                 </TouchableOpacity>
               </View>
             ))}
           </ScrollView>

             {/* 첫 번째 ScrollView */}
             <ScrollView  style={{ height: 300 }}>
             {yearList?.map((item: any, index: any) => (
               <View key={index} style={{ marginBottom: 10 }}>
                 <TouchableOpacity onPress={()=>setYear(item.value)} style={styles.dateSeleBox} key={index}>
                   <Text style={{  fontSize: 20, lineHeight: 34, color: 'black' }} key={index}>
                     {item.label}
                   </Text>
                 </TouchableOpacity>
               </View>
             ))}
           </ScrollView>
         </View>
         <View style={{ marginBottom: 50 }} />
       </Animated.View>
     </>
      )}




      {showList && <CustomBottomSheet showContent={showContent} name={name} setChange={setName} setInit={setInit} title="Bottom Sheet" ref={bottomSheetRef} />}
    </View>
    </>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8751A',
    flexDirection: 'column',
    height: height,
    paddingBottom: 50
  },
  containerWithKeyboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8751A',
    flexDirection: 'column',
    height: height,
    paddingBottom: 350
  },
  selectionView: {
    flexDirection: 'row',
    width: (width - 60) / 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 30,
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    marginVertical: 12
  },
  saveBtn: {
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 10,
    height: 50,
    width: width - 48,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
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
});