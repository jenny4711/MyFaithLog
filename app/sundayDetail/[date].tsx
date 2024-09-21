import { Platform,View, Text ,ScrollView,StyleSheet,Dimensions,TouchableOpacity,Keyboard,KeyboardAvoidingView,Image} from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
import Animated,{Easing,FadeInLeft,FadeInUp,FadeInDown} from 'react-native-reanimated'
import { useLocalSearchParams ,useNavigation} from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useQueryClient } from '@tanstack/react-query';
import { useDeletedData } from '~/hooks/useFormData';
import { useSaveData } from '~/hooks/useFormData';
import DetailWithEdit from '~/components/detail/DetailWithEdit'
import FirstView from '~/components/detail/FirstView'
const {width} = Dimensions.get('window')
const SundayDetail = () => {
  const { date, content, title, photo, orgDate, note } = useLocalSearchParams()
  const [showDone,setShowDone]=useState(false)
const deletedMutation=useDeletedData({category:'dailyQt',date})
const saveMutation=useSaveData({date:orgDate,category:'dailyQt'}) as any
const queryClient=useQueryClient()
const navigation = useNavigation()
const [edDate,setEdDate]=useState<any>(date)
const [edContent,setEdContent]=useState<any>(content)
const [edTitle,setEdTitle]=useState<any>(title)
const [edPhoto,setEdPhoto]=useState<any>(photo)
const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
const [edNote,setEdNote]=useState<any>(note)

const titleRef=useRef(null)
const conRef=useRef(null)
const noteRef=useRef(null)
const photoRef=useRef(null)
const dateRef=useRef(null)


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
  deletedMutation.mutate({category:'sundayQt',date:orgDate},
    {
      onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey:['data','sundayQt']})
        return (navigation as any).navigate('sundayQt')
      }
    }
  )
}

const handleDone=()=>{
  saveMutation.mutate({category:'sundayQt',date:orgDate,title:edTitle,content:edContent,photo:edPhoto,note:edNote})
  setShowDone(false)
  queryClient.invalidateQueries({queryKey:['data','sundayQt']})
  return (navigation as any).navigate('sundayQt')

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
      <Text>{photo}</Text>
    </Animated.View>
    :
    <DetailWithEdit sizeH={100} text="Meditation" value={edPhoto} setChange={setEdPhoto} />
    
    }

<Text style={{fontFamily:"LineSeedKR-Bd",fontSize:14,color:'white',marginLeft:7,fontWeight:700,opacity:0.8,}}>적용</Text>
   { !showDone?
    <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)} style={styles.itemView} exiting={FadeInDown.duration(100).easing(Easing.ease)}>
      <Text>{note}</Text>
    </Animated.View>
    :
    <DetailWithEdit sizeH={100} text="Application"  value={edNote} setChange={setEdNote} />
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

export default SundayDetail
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