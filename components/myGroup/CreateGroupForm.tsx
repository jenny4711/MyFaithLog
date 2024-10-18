import { View, Text ,StyleSheet,Dimensions,TextInput,TouchableOpacity} from 'react-native'
import React from 'react'
import { saveGroup } from '~/utils/fireStoreFn'
const {width} = Dimensions.get('window')
const CreateGroupForm = ({
  setBlockMember,
  setMember,
  member,
  blockMember,
  groupName,
  creator,
  memo,
  password,
  setGroupName,
  setCreator,
  setMemo,
  setPassword}:any) => {
  
  const createGroup = async() => {
    await saveGroup({groupName,creator,memo,member,blockMember,password,list:[]})
   
  setGroupName('')
    setMemo('')
    setCreator('')
    setPassword('')
    setMember([])
    setBlockMember([])
    console.log('group created')
  }
  
  
  return (
    <View style={styles.eachView}>
        <Text style={{marginTop:18,fontFamily:'LineSeedKr-Bd'}}>그룹 만들기</Text>

        <View style={styles.eachSecView}>
          <TextInput value={groupName} onChangeText={(value)=>setGroupName(value)} placeholder="그룹 이름" style={{borderBottomWidth:1,borderColor:'gray',width:width-96,margin:8,fontSize:18}}/>

          <TextInput value={creator} placeholder="이메일" onChangeText={(value)=>setCreator(value)} style={{borderBottomWidth:1,borderColor:'gray',width:width-96,margin:8,fontSize:18}}/>
          <TextInput value={memo} placeholder="공지 및 글남기기" onChangeText={(value)=>setMemo(value)}  style={{borderBottomWidth:1,borderColor:'gray',width:width-96,margin:8,fontSize:18}} multiline={true}/>
          <TextInput value={password} onChangeText={(value)=>setPassword(value)} placeholder="패스워드(옵션)" style={{borderBottomWidth:1,borderColor:'gray',width:width-96,margin:8,fontSize:18}}/>
          <TouchableOpacity activeOpacity={1} onPress={createGroup} style={{width:width-96,backgroundColor:'#E8751A',height:40,justifyContent:'center',alignItems:'center',margin:8,borderRadius:24}}>
            <Text style={{color:'white'}}>Create</Text>
          </TouchableOpacity>

        </View>

      </View>
  )
}

export default CreateGroupForm
const styles=StyleSheet.create({
  eachView: {
    width:width-48,
    backgroundColor:'white',
    
    borderRadius:24,
    alignItems:'center'
  },
  eachSecView: {
    // width:width-96,
    alignItems:'center'

  }

})