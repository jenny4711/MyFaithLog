import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Platform,
  ScrollView,
  Alert,
  Pressable,
  Button,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { getTodayDate } from '~/utils/utils';
import { currentAvailableBible } from '~/utils/selectionArray';

import SundayForm from '~/components/form/SundayForm';


import RNPickerSelect from 'react-native-picker-select';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';


import Head from 'expo-router/head';

import { useStorageContext } from '~/context/StorageContext';
import DailyFormIOS from '~/components/form/dailyFormIOS';
import { saveSunday, saveWithoutEmail } from '~/utils/localStorageFn';
const { width, height } = Dimensions.get('window');

const Form = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [fullDate, setFullDate] = useState('');
  const [meditation, setMeditation] = useState('');
  const [pray, setPray] = useState('');
  const [application, setApplication] = useState('');

  const [photo, setPhoto] = useState('');
  const [showDone, setShowDone] = useState(true);
  const [note, setNote] = useState('');
const [goToBib,setGoToBib]=useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [saved, setSaved] = useState(false);
  const scrollViewRef = useRef(null) as any;
  const medRef = useRef<TextInput>(null);
  const appRef = useRef<TextInput>(null);
  const prayRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const router = useRouter();
  // const bottomSheetRef = useRef<BottomSheet>(null);
  const [showDate, setShowDate] = useState(false);

  const offset = useSharedValue(0);

  const {
    setLang,
    lang,
    init,
    setInit,
    name,
    setName,
    verse,
    setVerse,
    toVerse,
    setToVerse,
    page,
    setPage,
    toPage,
    setToPage,
    showContent,
    setShowContent,
    setAiAnswer,
    aiAnswer,
    category,
    setCategory,
  } = useStorageContext();

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const getHr = today.getHours();
    const getMin = today.getMinutes();
    const fullToday = getTodayDate();
    setDate(String(fullToday));
    console.log(currentDay, 'currentDay');
    console.log(currentMonth, 'currentMonth');
    console.log(currentYear, 'currentYear');
    console.log(getHr, 'getHr');
    console.log(getMin, 'getMin');
  }, []);


  useEffect(()=>{
    if(goToBib){
    return  (navigation as any).navigate('chooseBibleSec')
    }
  },[goToBib])

  useEffect(() => {
    if (showContent !== undefined) {
      setContent(showContent.map((line: any) => line));
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
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const goToBible = () => {
    if (showContent && showContent.length > 0) {
      return (navigation as any).navigate('chooseBibleSec');
    }

    return (navigation as any).navigate('chooseBibleSec');
  };

  const reset = () => {
    setName('');
    setTitle('');
    setVerse('');
    setPage('');
    setToVerse('');
    setToPage('');
    setShowContent([]);
    setContent([]);
    aiAnswer && setAiAnswer('');
  };

  const handleSaveBtn = async () => {
    try {
      if (category === '') {
        Alert.alert('Please select the category');
        return;
      }

      if (date === '') {
        Alert.alert('Please select the date');
        return;
      }

      setSaved(true);
      //  const date = await AsyncStorage.getItem('date');
      const address = `${page}장${verse}절-${toPage}장${toVerse}절 `;
      const fullDate = `${month}/${date}/${year}`;
      if (category === 'dailyqt') {
        await saveWithoutEmail({
          title,
          content,
          date: fullDate,
          meditation,
          application,
          pray,
          address,
          name,
        });
      } else {
        await saveSunday({
          title,
          content,
          date: fullDate,
          note,
          photo,
          address,
          name,
        });
      }

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

      setName('');

      setDatePickerVisibility(false);
      if (category === 'dailyqt') {
        return (navigation as any).navigate('dailyListPg');
      } else {
        return (navigation as any).navigate('sundayListPg');
      }
    } catch (error) {
      console.log(error, 'error-handleSaveBtn');
    }
  };

  const goToSection = () => {
    if (category === 'dailyqt') {
      return (navigation as any).navigate('dailyqt');
    } else {
      return (navigation as any).navigate('sunday');
    }
  };

  return (
    <>
      <Head>
        <title>My Faith Log</title>
        <meta name="description" content="My Faith Log" />
      </Head>
      <View
        style={[
          { justifyContent: 'center', alignItems: 'center' },
          keyboardVisible ? styles.containerWithKeyboard : styles.container,
        ]}
      >
        <View
          style={{
            width: width - 96,
            marginBottom: 16,
            marginTop: 80,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={handleSaveBtn}>
            <Text style={{ fontFamily: 'LotteBd', fontSize: 18 }}>저장</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={{ height: height, paddingVertical: 10 }}
        >
          <KeyboardAvoidingView
            style={{ justifyContent: 'center', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.select({ ios: -500, android: 80 })}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <RNPickerSelect
                onValueChange={(value) => setName(value)}
                items={
                  currentAvailableBible && Array.isArray(currentAvailableBible)
                    ? currentAvailableBible
                    : []
                }
                onClose={ (wasDonePressed) => {
                  console.log(wasDonePressed, 'wasDonePress')
                  console.log(name, 'name')
                  
                  if (wasDonePressed ) {
                    console.log("조건 충족: 네비게이션 시도");
                    try {
                      // 네비게이션 시도
                      // router.push({
                      //   pathname: "/chooseBibleSec",
                      //   params: {
                      //     presentation: 'modal'
                      //   }
                      // });
                  
                   (navigation as any).navigate("chooseBibleSec" );
                      console.log("네비게이션 성공");
                    } catch (error:any) {
                      console.error("네비게이션 오류:", error);
                      Alert.alert("네비게이션 오류", error.message);
                    }
                  } else {
                    console.log("조건 미충족: name이 비어있거나 done이 눌리지 않음");
                  }
                
                }}
                placeholder={{ label: '성경 보기', value: null }} // 👉 기본으로 보일 값 설정
                style={{
                  inputIOS: {
                    backgroundColor: 'white', // iOS 스타일
                    color: 'black', // 텍스트 색상 (가독성을 위해 흰색 추천)
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    width: width - 149,
                    height: 40,
                    textAlign: 'center',
                    marginRight: 5,
                    marginTop: 16,
                    borderRadius: 10,
                    fontWeight: 'bold',
                    fontSize: 18,
                  },
                  placeholder: {
                    color: 'black', // "성경 보기" 글자 색상 변경
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  },
                }}
              />

              <TouchableOpacity
                style={{
                  height: 40,
                  width: 50,
                  backgroundColor: '#ffffff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                onPress={() => reset()}
              >
                <Text>Reset</Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: width, alignItems: 'center' }}>
              <TextInput
                style={{
                  width: width - 96,
                  height: 80,
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 16,
                  fontSize: 18,
                }}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                multiline={true}
              />
            </View>

            {category === 'sundayQt' ||
            category === 'thanks' ||
            category === 'source' ? (
              <SundayForm
                note={note}
                setNote={setNote}
                photo={photo}
                setPhoto={setPhoto}
                showDone={showDone}
                category={category}
              />
            ) : (
              <DailyFormIOS
                setMeditation={setMeditation}
                setApplication={setApplication}
                setPray={setPray}
                meditation={meditation}
                application={application}
                pray={pray}
                lang={lang}
                medRef={medRef}
                appRef={appRef}
                prayRef={prayRef}
                scrollToInput={scrollToInput}
              />
            )}
          </KeyboardAvoidingView>
          <View
            style={{ width: width - 48, alignItems: 'flex-end', marginTop: 30 }}
          >
            <TouchableOpacity
              onPress={() => goToSection()}
              style={{
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 100,
                marginRight: 20,
              }}
            >
              <Ionicons
                name="return-down-back-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: '#D7A31F',
    flexDirection: 'column',
    height: height,

    //  paddingBottom: 30
  },
  containerWithKeyboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7A31F',
    flexDirection: 'column',
    height: height,
    paddingBottom: 350,
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
    marginVertical: 12,
  },
  saveBtn: {
    marginBottom: 50,
    marginTop: 10,
    borderRadius: 10,
    height: 50,
    width: width - 140,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
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
    borderTopLeftRadius: 20,
  },
  dateSeleBox: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    width: width / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
