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
        <Text style={{marginTop:16}}>Create Group</Text>

        <View style={styles.eachSecView}>
          <TextInput value={groupName} onChangeText={(value)=>setGroupName(value)} placeholder="Group Name" style={{borderWidth:1,borderColor:'black',width:width-96,margin:8}}/>

          <TextInput value={creator} onChangeText={(value)=>setCreator(value)} style={{borderWidth:1,borderColor:'black',width:width-96,margin:8}}/>
          <TextInput value={memo} onChangeText={(value)=>setMemo(value)} placeholder="Memo" style={{borderWidth:1,borderColor:'black',width:width-96,margin:8}} multiline={true}/>
          <TextInput value={password} onChangeText={(value)=>setPassword(value)} placeholder="Password-[option]" style={{borderWidth:1,borderColor:'black',width:width-96,margin:8}}/>
          <TouchableOpacity activeOpacity={1} onPress={createGroup} style={{width:width-96,backgroundColor:'#E8751A',height:40,justifyContent:'center',alignItems:'center',margin:8}}>
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