import { Platform,View, Text ,ScrollView,StyleSheet,Dimensions,TouchableOpacity,Keyboard,KeyboardAvoidingView, Pressable} from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
import { useLocalSearchParams ,useNavigation} from 'expo-router'
import Animated,{Easing,FadeInLeft,FadeInUp,FadeInDown} from 'react-native-reanimated'
import FirstView from '~/components/detail/FirstView'
import StatusCheck from '~/components/form/StatusCheck'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useQueryClient } from '@tanstack/react-query';
import { useDeletedData } from '~/hooks/useFormData';
import { useSaveData,useData} from '~/hooks/useFormData';
import { addDailyQtToGroup } from '~/utils/fireStoreFn'
import DetailWithEdit from '~/components/detail/DetailWithEdit'
import BibleWithEdit from '~/components/detail/BibleWithEdit'
const {width} = Dimensions.get('window')

export async function generateStaticParams(item: any): Promise<Record<string, string>[]> {
  const dateArray = Array.isArray(item) ? item : [];

  dateArray.push({ date: '2022-01-01' });

  console.log(dateArray, 'dateArray');
  return dateArray;
}



const Detail = () => {
  const { date,meditation,pray,application,content,address,title,orgDate} = useLocalSearchParams()
const [showDone,setShowDone]=useState(false)
const deletedMutation=useDeletedData({category:'dailyQt',date})
const saveMutation=useSaveData({date:orgDate,category:'dailyQt'}) as any
const queryClient=useQueryClient()
const navigation = useNavigation()
const [dateArray,setDateArray]=useState<any>([])
const [edTitle,setEdTitle]=useState<any>(title)
const [edContent,setEdContent]=useState<any>(content)
const [edMeditation,setEdMeditation]=useState<any>(meditation)
const [edApplication,setEdApplication]=useState<any>(application)
const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
const [checkStatus,setCheckStatus]=useState([])
const [edPray,setEdPray]=useState<any>(pray)
const [showBible,setShowBible]=useState(false)  
const {data}=useData('dailyQt')
const titleRef=useRef(null)
const conRef=useRef(null)
const medRef=useRef(null)
const appRef=useRef(null)
const prayRef=useRef(null)


useEffect(() => {
  if (data) {
    const generatedDateArray = data.map((item: any) => {
      const [month, day, year] = item.date.split('-');
      const formattedDate = `${year}-${month}-${day}`;
      return { date: formattedDate };
    });
    setDateArray(generatedDateArray);
  }
}, [data]);

useEffect(() => {
  async function fetchData() {
    // item이 배열인지 확인 후 generateStaticParams 호출
    const params = await generateStaticParams(dateArray);
    console.log(params);
  }
  fetchData();
}, [dateArray]);




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

const editHanlder=()=>{
  setShowDone(true)
}
const handleDeleted=async()=>{
  deletedMutation.mutate({category:'dailyQt',date:orgDate},
    {
      onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey:['data','dailyQt']})
        return (navigation as any).navigate('dailyqt')
      }
    }
  )
}

const handleDone=()=>{
  saveMutation.mutate({category:'dailyQt',date:orgDate,title:edTitle,content:edContent,meditation:edMeditation,application:edApplication,pray:edPray,address,name:''})
  setShowDone(false)
  queryClient.invalidateQueries({queryKey:['data','dailyQt']})
  checkStatus.map(async(item:any)=>{
    await addDailyQtToGroup({groupName:item,date:orgDate,category:'dailyQt'})
  })
  return (navigation as any).navigate('dailyqt')

}
  return (
    <>
    <View style={{backgroundColor: '#E8751A'}}>
      <FirstView date={date} showDone={showDone} fnBtn={showDone?handleDone:editHanlder} />
      </View>
    <View style={keyboardVisible?styles.keyWithContainer:styles.container}>
    
      <ScrollView  showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView     
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: -500, android: 80 })}
      >
        <Pressable style={{ backgroundColor: '#E8751A',}} onPress={()=>setShowBible(!showBible)}>
          
          <Text  style={styles.resultTitle}>{!showBible?'말씀 보기':'말씀 닫기'}</Text>
          </Pressable>
      
      
        <Animated.ScrollView entering={FadeInUp.duration(500).easing(Easing.ease)} style={!showBible?{display:'none'}:styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
          {showBible&&edContent&&edContent.map((item:any,index:number)=><Text style={!showBible?{display:'none'}:{marginVertical:10,fontSize:18,lineHeight:24}} key={index}>{JSON.stringify(item)}</Text>)}
        {/* <Text style={{fontFamily:"LineSeedKR-Rg",fontSize:15}}>{content}</Text> */}
      </Animated.ScrollView>
      


<Text style={styles.resultTitle}>제목</Text>


      {!showDone? 

<Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)} style={styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>

       <Text style={{fontFamily:"LineSeed-Rg",fontSize:18}}>{title}</Text>
       </Animated.View>
       
       :
       <DetailWithEdit sizeH={40} text="Title" value={edTitle}  setChange={setEdTitle} />
     
        
      }
      
      
     <Text style={styles.resultTitle}>묵상</Text>
       {!showDone?
        <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)} style={styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
        <Text style={styles.resultText}>{meditation}</Text>
      </Animated.View>
      :
      <DetailWithEdit sizeH={100} text="Meditation" value={edMeditation} setChange={setEdMeditation} />
      
      }

<Text style={styles.resultTitle}>적용</Text>
     { !showDone?
      <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)} style={styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
        <Text style={styles.resultText}>{application}</Text>
      </Animated.View>
      :
      <DetailWithEdit sizeH={100} text="Application"  value={edApplication} setChange={setEdApplication} />
      }

     
<Text style={styles.resultTitle}>기도</Text>

     { !showDone?
      <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)} style={styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
        <Text style={styles.resultText}>{pray}</Text>
      </Animated.View>
      :
      <DetailWithEdit sizeH={100} text="Pray"  value={edPray} setChange={setEdPray} />
      }

{
  showDone?
  <StatusCheck checkStatus={checkStatus} setCheckStatus={setCheckStatus} />:
  null
}
</KeyboardAvoidingView>
      </ScrollView>
      <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)}  exiting={FadeInDown.duration(500).easing(Easing.ease)} style={showDone?{display:'none'}:{width:50,height:50,borderRadius:100,backgroundColor:'white',justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:20}}>
        <TouchableOpacity onPress={handleDeleted} style={{position:'absolute',bottom:16,right:16}}>
          <AntDesign name="delete" size={16} color="black" />
        </TouchableOpacity>
      </Animated.View>

    </View>
    </>
  )
}

export default Detail
const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8751A',
    paddingBottom:24,
  
  
    
  },
  keyWithContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8751A',
    paddingBottom:24,
    marginBottom:340

  },
  itemView:{
    backgroundColor:'white',
    width:width-48,
    marginVertical:10,
    paddingHorizontal:10,
    paddingVertical:10
    ,borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  },
  resultText:{
    fontFamily:"LineSeed-Rg",
    fontSize:18,
    padding:10
  },
  resultTitle:{
    fontFamily:"LineSeedKR-Bd",
    fontSize:20,
    color:'white',
    marginLeft:7,
    fontWeight:700,
    opacity:0.8,
    paddingTop:12
  }
})