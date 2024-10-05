import { View, Text ,TouchableOpacity,Dimensions,Alert} from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
const {width} = Dimensions.get('window')
const GroupListItemBtn = ({group,index}:any) => {
  const navigation = useNavigation()

  const goToDetail=()=>{
    console.log('group',group)
    if(group?.password !==""){
      Alert.prompt('비밀번호를 입력해주세요','비밀번호를 입력해주세요',[
        {
          text:'확인',
          onPress:(password)=>{
            if(password===group?.password){
              ( navigation as any).navigate('groupDetail/[groupName]',{groupName:group.groupName})
            }else{
              Alert.alert('비밀번호가 일치하지 않습니다')
            }
          }
        },
        {
          text:'취소',
          onPress:()=>{console.log('cancel')}
        }
      ])
      }




 
  }

  return (
    <TouchableOpacity onPress={goToDetail} key={index} style={{width:width-48,backgroundColor:'white',marginTop:8,borderRadius:10,paddingHorizontal:16,paddingVertical:16}}>
    <Text style={{fontSize:20,fontFamily:"LineSeedKr-Bd"}}>{group.groupName}</Text>
 <Text style={{fontSize:16,fontFamily:'LineSeedKR-Rg'}}>{group.memo}</Text>
    <Text style={{fontSize:16,fontFamily:'LineSeedKR-Rg'}}>{group.creator}</Text>
   
  </TouchableOpacity>
  )
}

export default GroupListItemBtn