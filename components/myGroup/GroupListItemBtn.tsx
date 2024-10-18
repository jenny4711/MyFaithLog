import { View, Text ,TouchableOpacity,Dimensions,Alert,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from 'expo-router'
const {width} = Dimensions.get('window')
const GroupListItemBtn = ({group,index}:any) => {
  const navigation = useNavigation()
const [password,setPassword]=useState('')



const goToDetail=()=>{
  if(group?.password !==""){
    if(password ===""){
      Alert.alert("비밀번호를 입력해주시고 눌러주세요")
    }
   else if(password===group?.password){
      ( navigation as any).navigate('groupDetail/[groupName]',{groupName:group.groupName})
    }else{
      Alert.alert('비밀번호가 일치하지 않습니다')
    }
  }else{
    ( navigation as any).navigate('groupDetail/[groupName]',{groupName:group.groupName})
  }
}




  return (
    <TouchableOpacity  onPress={goToDetail} key={index} style={{width:width-48,backgroundColor:'white',marginTop:8,borderRadius:10,paddingHorizontal:16,paddingVertical:16,marginVertical:10}}>
    <Text style={{fontSize:20,fontFamily:"LineSeedKr-Bd"}}>{group.groupName}</Text>
 <Text style={{fontSize:16,fontFamily:'LineSeedKR-Rg'}}>{group.memo}</Text>
    <Text style={{fontSize:16,fontFamily:'LineSeedKR-Rg'}}>{group.creator}</Text>
{group?.password !==""?   <TextInput style={{fontSize:20}} secureTextEntry placeholder='비밀번호 입력해주세요' value={password} onChangeText={setPassword} />:null}
  </TouchableOpacity>
  )
}

export default GroupListItemBtn
