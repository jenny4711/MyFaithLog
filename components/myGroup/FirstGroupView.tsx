import { View, Text ,Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation ,useRouter} from 'expo-router';
const {width} = Dimensions.get('window')  
const FirstGroupView = ({setOnChange,onChange,title}:any) => {
  const router = useRouter();
  const goToSetting=()=>{
    router.back(); // 모달 닫기
    router.push('/setting')
  }
  return (
    <View style={{flexDirection:'row',width:width-48,paddingVertical:16,justifyContent:'space-between'}}>
<TouchableOpacity onPress={()=>setOnChange(!onChange)}>
  <Text style={{fontSize:16,fontFamily:"LineSeedKr-Bd"}}>{title}</Text>
</TouchableOpacity>

      <TouchableOpacity onPress={goToSetting}>
     <AntDesign name="setting" size={20} color="black" />
     </TouchableOpacity>
    </View>
  )
}

export default FirstGroupView