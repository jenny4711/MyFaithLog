import {
  Platform,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInUp,
  FadeInDown,
} from 'react-native-reanimated';
import FirstView from '~/components/detail/FirstView';
import StatusCheck from '~/components/form/StatusCheck';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useQueryClient } from '@tanstack/react-query';
import { useDeletedData } from '~/hooks/useFormData';
import { useSaveData, useData } from '~/hooks/useFormData';
import { addDailyQtToGroup } from '~/utils/fireStoreFn';
import DetailWithEdit from '~/components/detail/DetailWithEdit';
import BibleWithEdit from '~/components/detail/BibleWithEdit';
import { deletedWithoutEmail, getDailyData, saveWithoutEmail } from '~/utils/localStorageFn';
const { width } = Dimensions.get('window');

export async function generateStaticParams(
  item: any
): Promise<Record<string, string>[]> {
  const dateArray = Array.isArray(item) ? item : [];

  dateArray.push({ date: '2022-01-01' });

  return dateArray;
}

const Detail = () => {
  const {
    date,
    meditation,
    pray,
    application,
    content,
    address,
    title,
    orgDate,
    name,
  } = useLocalSearchParams();
  const [showDone, setShowDone] = useState(false);
  const deletedMutation = useDeletedData({ category: 'dailyQt', date });
  const saveMutation = useSaveData({
    date: orgDate,
    category: 'dailyQt',
  }) as any;
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [dateArray, setDateArray] = useState<any>([]);
  const [edTitle, setEdTitle] = useState<any>(title);
  const [edContent, setEdContent] = useState<any>(content);
  const [edMeditation, setEdMeditation] = useState<any>(meditation);
  const [edApplication, setEdApplication] = useState<any>(application);
  const [edName,setEdName]= useState<any>(name)
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState([]);
  const [edPray, setEdPray] = useState<any>(pray);
  const [showBible, setShowBible] = useState(false);



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
    console.log(date, 'date-deleted!');

    await deletedWithoutEmail(date);
    await getDailyData();
    return (navigation as any).navigate("dailyListPg");
  };

  const handleDone = async() => {
   await saveWithoutEmail({
      category: 'dailyQt',
      date: orgDate,
      title: edTitle,
      content: edContent,
      meditation: edMeditation,
      application: edApplication,
      pray: edPray,
      address,
      name: edName,
    });
    setShowDone(false);
    queryClient.invalidateQueries({ queryKey: ['data', 'dailyQt'] });
    checkStatus.map(async (item: any) => {
      await addDailyQtToGroup({
        groupName: item,
        date: orgDate,
        category: 'dailyQt',
      });
    });
    return (navigation as any).navigate('dailyqt');
  };
  return (
    <View
      style={{
        flex: 1,
        width: width,
        alignItems: 'center',
        backgroundColor: '#D7A31F',
        
      }}
    >
      <View style={{ backgroundColor: '#D7A31F', alignItems: 'center' }}>
        <FirstView
          date={date}
          showDone={showDone}
          fnBtn={showDone ? handleDone : editHanlder}
        />
      </View>
      <View
        style={keyboardVisible ? styles.keyWithContainer : styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{width:width-48}}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.select({ ios: -500, android: 80 })}
          >
            <View style={{ flexDirection: 'column', marginBottom: 27}}>
              <Text style={{ fontSize: 36, fontFamily: 'LotteBd' }}>
                {name}
              </Text>
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
                    style={
                      !showBible
                        ? { display: 'none' }
                        : { marginVertical: 10, fontSize: 18, lineHeight: 24 }
                    }
                    key={index}
                  >
                    {JSON.stringify(item)}
                  </Text>
                ))}
            </Animated.ScrollView>
            <View style={{width:width-48,justifyContent:'center'}}>

            <Text style={styles.resultTitle}>
              {meditation !== '' ? '묵상' : null}
            </Text>
            {!showDone ? meditation !== '' && (
              <Animated.View
                entering={FadeInUp.duration(500).easing(Easing.ease)}
                style={styles.itemView}
                exiting={FadeInDown.duration(100).easing(Easing.ease)}
              >
                <Text style={styles.resultText}>{meditation}</Text>
              </Animated.View>
            ) : (
              <DetailWithEdit
                sizeH={100}
                text="Meditation"
                value={edMeditation}
                setChange={setEdMeditation}
              />
            )}
               </View>
            <Text style={styles.resultTitle}>
              {application !== '' ? '적용' : null}
            </Text>
            {!showDone ? (
              <Animated.View
                entering={FadeInUp.duration(500).easing(Easing.ease)}
                style={[ styles.itemView]}
                exiting={FadeInDown.duration(100).easing(Easing.ease)}
              >
                <Text style={styles.resultText}>{application}</Text>
              </Animated.View>
            ) : (
              <DetailWithEdit
                sizeH={100}
                text="Application"
                value={edApplication}
                setChange={setEdApplication}
              />
            )}

            <Text style={styles.resultTitle}>
              {pray !== '' ? '기도' : null}
            </Text>

            {!showDone ? (
              <Animated.View
                entering={FadeInUp.duration(500).easing(Easing.ease)}
                style={[styles.itemView]}
                exiting={FadeInDown.duration(100).easing(Easing.ease)}
              >
                <Text style={styles.resultText}>{pray}</Text>
              </Animated.View>
            ) : (
              <DetailWithEdit
                sizeH={100}
                text="Pray"
                value={edPray}
                setChange={setEdPray}
              />
            )}

            {showDone ? (
              <StatusCheck
                checkStatus={checkStatus}
                setCheckStatus={setCheckStatus}
              />
            ) : null}
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={{ width: width - 48, alignItems: 'flex-end' }}>
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                    backgroundColor: 'white',
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
      </View>
    </View>
  );
};

export default Detail;
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
    // backgroundColor:'white',
    width: width - 48,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultText: {
    fontFamily: 'LineSeed-Rg',
    fontSize: 18,
    padding: 10,
    lineHeight: 33,
  },
  resultTitle: {
    fontFamily: 'LotteBd',
    fontSize: 25,
    paddingTop: 12,
  },
  resultTitleBtn: {
    fontFamily: 'LotteBd',
    fontSize: 17,
    color: 'white',
    padding: 15,
    fontWeight: 700,
  },
});
