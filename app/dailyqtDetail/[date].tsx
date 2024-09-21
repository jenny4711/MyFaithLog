import { Platform,View, Text ,ScrollView,StyleSheet,Dimensions,TouchableOpacity,Keyboard,KeyboardAvoidingView} from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
import { useLocalSearchParams ,useNavigation} from 'expo-router'
import Animated,{Easing,FadeInLeft,FadeInUp,FadeInDown} from 'react-native-reanimated'
import FirstView from '~/components/detail/FirstView'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useQueryClient } from '@tanstack/react-query';
import { useDeletedData } from '~/hooks/useFormData';
import { useSaveData } from '~/hooks/useFormData';
import { QueryClient } from '@tanstack/react-query'
import { TextInput } from 'react-native-gesture-handler'
import DetailWithEdit from '~/components/detail/DetailWithEdit'
const {width} = Dimensions.get('window')

export async function generateStaticParams():Promise<Record<string,string>[]>{
  return [
    {date:'2022-01-01'},
    {date:'2022-01-02'},
    {date:'2022-01-03'},
    {date:'2022-01-04'},
  ]
  }



const Detail = () => {
  const { date,meditation,pray,application,content,address,title,orgDate} = useLocalSearchParams()
const [showDone,setShowDone]=useState(false)
const deletedMutation=useDeletedData({category:'dailyQt',date})
const saveMutation=useSaveData({date:orgDate,category:'dailyQt'}) as any
const queryClient=useQueryClient()
const navigation = useNavigation()
const [edTitle,setEdTitle]=useState<any>(title)
const [edContent,setEdContent]=useState<any>(content)
const [edMeditation,setEdMeditation]=useState<any>(meditation)
const [edApplication,setEdApplication]=useState<any>(application)
const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
const [edPray,setEdPray]=useState<any>(pray)
const titleRef=useRef(null)
const conRef=useRef(null)
const medRef=useRef(null)
const appRef=useRef(null)
const prayRef=useRef(null)

console.log(edContent[0],'title')

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
  return (navigation as any).navigate('dailyqt')

}
  return (
    <View style={keyboardVisible?styles.keyWithContainer:styles.container}>
      <FirstView date={date} showDone={showDone} fnBtn={showDone?handleDone:editHanlder} />
      <ScrollView>
      <KeyboardAvoidingView     
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: -500, android: 80 })}
      >
        <Text style={{fontFamily:"LineSeedKR-Bd",fontSize:14,color:'white',marginLeft:7,fontWeight:700,opacity:0.8,}}>말씀</Text>
      
      {!showDone?
        <Animated.ScrollView entering={FadeInUp.duration(500).easing(Easing.ease)} style={styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
          {edContent&&edContent.map((item:any,index:number)=><Text style={{marginVertical:10,fontSize:16,lineHeight:24}} key={index}>{JSON.stringify(item)}</Text>)}
        {/* <Text style={{fontFamily:"LineSeedKR-Rg",fontSize:15}}>{content}</Text> */}
      </Animated.ScrollView>
      :
      <DetailWithEdit sizeH={100} text="Content" value={edContent}  setChange={setEdContent} />
      }


<Text style={{fontFamily:"LineSeedKR-Bd",fontSize:14,color:'white',marginLeft:7,fontWeight:700,opacity:0.8}}>제목</Text>
      {!showDone? 


<Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)} style={styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
       <Text style={{fontFamily:"LineSeed-Rg"}}>{title}</Text>
       </Animated.View>
       
       :
       <DetailWithEdit sizeH={40} text="Title" value={edTitle}  setChange={setEdTitle} />
     
        
      }
     
      
     <Text style={{fontFamily:"LineSeedKR-Bd",fontSize:14,color:'white',marginLeft:7,fontWeight:700,opacity:0.8,}}>묵상</Text>
       {!showDone?
        <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)} style={styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
        <Text>{meditation}</Text>
      </Animated.View>
      :
      <DetailWithEdit sizeH={100} text="Meditation" value={edMeditation} setChange={setEdMeditation} />
      
      }

<Text style={{fontFamily:"LineSeedKR-Bd",fontSize:14,color:'white',marginLeft:7,fontWeight:700,opacity:0.8,}}>적용</Text>
     { !showDone?
      <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)} style={styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
        <Text>{application}</Text>
      </Animated.View>
      :
      <DetailWithEdit sizeH={100} text="Application"  value={edApplication} setChange={setEdApplication} />
      }

     
<Text style={{fontFamily:"LineSeedKR-Bd",fontSize:14,color:'white',marginLeft:7,fontWeight:700,opacity:0.8,}}>기도</Text>

     { !showDone?
      <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)} style={styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
        <Text>{pray}</Text>
      </Animated.View>
      :
      <DetailWithEdit sizeH={100} text="Pray"  value={edPray} setChange={setEdPray} />
      }

    
</KeyboardAvoidingView>
      </ScrollView>
      <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)}  exiting={FadeInDown.duration(500).easing(Easing.ease)} style={showDone?{display:'none'}:{width:50,height:50,borderRadius:100,backgroundColor:'white',justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:20}}>
        <TouchableOpacity onPress={handleDeleted} style={{position:'absolute',bottom:16,right:16}}>
          <AntDesign name="delete" size={16} color="black" />
        </TouchableOpacity>
      </Animated.View>

    </View>
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
    
  }
})