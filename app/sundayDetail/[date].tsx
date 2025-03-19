import {
  Pressable,
  Platform,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInUp,
  FadeInDown,
} from 'react-native-reanimated';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useQueryClient } from '@tanstack/react-query';
import { useDeletedData } from '~/hooks/useFormData';
import { useSaveData } from '~/hooks/useFormData';
import { useStorageContext } from '~/context/StorageContext';
import DetailWithEdit from '~/components/detail/DetailWithEdit';
import FirstView from '~/components/detail/FirstView';
import { useRouter } from 'expo-router';
import { deletedSunday,saveSunday } from '~/utils/localStorageFn';
const { width } = Dimensions.get('window');
const SundayDetail = () => {
  const {
    date,
    content,
    title,
    photo,
    orgDate,
    note,
    name,
    address,
  } = useLocalSearchParams();
  const [showDone, setShowDone] = useState(false);
  const deletedMutation = useDeletedData({ category: 'dailyQt', date });
  const saveMutation = useSaveData({
    date: orgDate,
    category: 'dailyQt',
  }) as any;
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [edDate, setEdDate] = useState<any>(date);
  const [edContent, setEdContent] = useState<any>(content);
  const [edTitle, setEdTitle] = useState<any>(title);
  const [edPhoto, setEdPhoto] = useState<any>(photo);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [showBible, setShowBible] = useState(false);
  const [edNote, setEdNote] = useState<any>(note);
  const { img } = useStorageContext();
  const titleRef = useRef(null);
  const conRef = useRef(null);
  const noteRef = useRef(null);
  const photoRef = useRef(null);
  const dateRef = useRef(null);
  const router = useRouter();
  console.log(photo, 'content');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [setKeyboardVisible, keyboardVisible]);

  const editHanlder = () => {
    setShowDone(true);
  };
  const handleDeleted = async () => {
   await deletedSunday(date)
  };

  const handleDone = async() => {
  await  saveSunday({
      category: 'sundayQt',
      date: orgDate,
      title: edTitle,
      content: edContent,
      photo: edPhoto,
      note: edNote,
    });
    setShowDone(false);
    // queryClient.invalidateQueries({ queryKey: ['data', 'sundayQt'] });
    return (navigation as any).navigate('sundayQt');
  };
 

  return (
    <View style={keyboardVisible ? styles.keyWithContainer : styles.container}>
      <FirstView
        date={date}
        showDone={showDone}
        fnBtn={showDone ? handleDone : editHanlder}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: width - 60 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.select({ ios: -500, android: 80 })}
        >
          <View style={{ flexDirection: 'column', marginBottom: 27 }}>
            <Text style={{ fontSize: 36, fontFamily: 'LotteBd' }}>{name}</Text>
            <Text
              style={{
                fontSize: 26,
                width: 200,
                fontFamily: 'LotteRg',
                lineHeight: 30,
                marginVertical: 11,
              }}
            >
              {title}
            </Text>
            <Text style={{ fontFamily: 'LotteTh', fontSize: 20 }}>
              {address}
            </Text>
          </View>

          <Pressable
            style={{
              backgroundColor: 'black',
              width: 100,
              borderRadius: 10,
              marginBottom: 56,
            }}
            onPress={() => setShowBible(!showBible)}
          >
            <Text style={styles.resultTitleBtn}>
              {!showBible ? '말씀 보기' : '말씀 닫기'}
            </Text>
          </Pressable>

          <Animated.ScrollView
            entering={FadeInUp.duration(500).easing(Easing.ease)}
            style={!showBible ? { display: 'none' } : [styles.itemView]}
            exiting={FadeInDown.duration(100).easing(Easing.ease)}
          >
            {showBible &&
              edContent &&
              edContent.map((item: any, index: number) => (
                <Text
                  style={{ marginVertical: 10, fontSize: 16, lineHeight: 24 }}
                  key={index}
                >
                  {JSON.stringify(item)}
                </Text>
              ))}
            {/* <Text style={{fontFamily:"LineSeedKR-Rg",fontSize:15}}>{content}</Text> */}
          </Animated.ScrollView>

          <Text style={styles.resultTitle}>{note !==""?"노트":null}</Text>
          {!showDone ? (
            <Animated.View
              entering={FadeInUp.duration(500).easing(Easing.ease)}
              style={styles.itemView}
              exiting={FadeInDown.duration(100).easing(Easing.ease)}
            >
              <Text style={styles.resultText}>{note}</Text>
            </Animated.View>
          ) : (
            <DetailWithEdit
              sizeH={100}
              text="Application"
              value={edNote}
              setChange={setEdNote}
            />
          )}

          <Text style={[styles.resultTitle, { marginBottom: 20 }]}>{photo?.length >0?"자료":null}</Text>

          <Animated.View
            entering={FadeInUp.duration(500).easing(Easing.ease)}
            exiting={FadeInDown.duration(100).easing(Easing.ease)}
          >
            {photo && Array.isArray(photo) && photo.length > 0 ? (
              <Image
                source={{ uri: photo[0] }}
                style={{ width: width - 60, height: 305, borderRadius: 10 }}
              />
            ) : null}
          </Animated.View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Animated.View
        entering={FadeInUp.duration(500).easing(Easing.ease)}
        exiting={FadeInDown.duration(500).easing(Easing.ease)}
        style={
          showDone
            ? { display: 'none' }
            : {
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 20,
                marginLeft: 300,
              }
        }
      >
        <TouchableOpacity
          onPress={handleDeleted}
          style={{ position: 'absolute', bottom: 16, right: 16 }}
        >
          <AntDesign name="delete" size={16} color="black" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SundayDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7A31F',
    paddingBottom: 24,
  },
  keyWithContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7A31F',
    paddingBottom: 24,
    marginBottom: 340,
  },
  itemView: {
    width: width - 60,
    marginVertical: 10,
    // paddingHorizontal:10,
    // paddingVertical:10
    borderRadius: 10,
  },
  resultText: {
    fontFamily: 'LineSeed-Rg',
    fontSize: 17,
    padding: 10,
    lineHeight: 33,
  },
  resultTitleBtn: {
    fontFamily: 'LotteBd',
    fontSize: 17,
    color: 'white',
    padding: 15,
    fontWeight: 700,
  },
  resultTitle: {
    fontFamily: 'LotteBd',
    fontSize: 25,

    fontWeight: 700,
  },
});

{
  /* <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
{ photo && Array.isArray(photo) && photo.length > 0 ? (
<Image source={{ uri: photo[0] }} style={{ width: width - 48, height: 200, borderRadius: 10 }} />
) : null}

</Animated.View> */
}
