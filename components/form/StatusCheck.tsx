import { View, Text,StyleSheet ,Dimensions} from 'react-native'
import React ,{useState}from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useGetMyGroupList } from '~/hooks/useFormData'
import Ionicons from '@expo/vector-icons/Ionicons';
const {width} = Dimensions.get('window')
const StatusCheck = ({checkStatus,setCheckStatus}:any) => {
  const [value,setValue]=useState('')
 const options=['case1','case2','case3','case4','case5']
 const {data}=useGetMyGroupList()

 function handleCheck(value:string){
const index = checkStatus.indexOf(( checked:any) =>checked === value)
if(checkStatus.includes(value)){
  const result=checkStatus.filter((item:any)=>item!==value)

  setCheckStatus(checkStatus.filter((item:any)=>item!==value))
  return;
}
setCheckStatus(checkStatus.concat(value))


 }
  return (
    <View style={styles.container}>
      <Text>Select your choose</Text>
      <View style={{flexDirection:'row'}}>
        {data?.map((item:any,index:any)=>(
          <View key={index} style={{flexDirection:'row',justifyContent:'center',marginRight:10}}>
          <TouchableOpacity onPress={()=>handleCheck(item?.groupName)} style={{width:15,height:15,borderWidth:2,borderColor:'red',marginRight:5,justifyContent:'center',alignItems:'center'}}>
            {checkStatus.includes(item?.groupName) && <Ionicons name={'checkmark'} size={15} color={'black'}/>}
          </TouchableOpacity>
          <Text>{item?.groupName}</Text>
          </View>
        ))}
      </View>
    
  </View>
  )
}

export default StatusCheck
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginVertical: 32,
    width:width-48
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});