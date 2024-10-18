import { View, Text ,Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
const {width} = Dimensions.get('window')  
const FirstGroupView = ({groupName,setOnChange,onChange,title,myStatus,setAddOnChange}:any) => {
  const router = useRouter();
  const navigation=useNavigation()
  const goToSetting=()=>{
    router.back(); // 모달 닫기
    router.push('/setting')
  }
const goToHome=()=>{
  router.back(); // 모달 닫기
  router.push('/home')
}
console.log(myStatus,'myStatus')
  return (
    <View style={{flexDirection:'row',width:width-48,paddingVertical:16,justifyContent:'space-between'}}>
<TouchableOpacity onPress={myStatus?()=>setOnChange(groupName):()=>setAddOnChange(groupName)}>
  <Text style={{fontSize:16,fontFamily:"LineSeedKr-Bd"}}>{title}</Text>
</TouchableOpacity>
<View style={{flexDirection:'row'}}>
<TouchableOpacity onPress={goToHome} style={{marginRight:8}}>
     <Ionicons name="home-outline" size={20} color="black" />
     </TouchableOpacity>

      <TouchableOpacity onPress={goToSetting}>
      <Ionicons name="settings-outline" size={20} color="black" />
     </TouchableOpacity>
    
     </View>
    </View>
  )
}

export default FirstGroupView