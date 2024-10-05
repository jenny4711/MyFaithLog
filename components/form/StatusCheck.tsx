import { View, Text,StyleSheet ,Dimensions} from 'react-native'
import React ,{useState}from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
const {width} = Dimensions.get('window')
const StatusCheck = ({checkStatus,setCheckStatus}:any) => {
  const [value,setValue]=useState('')
 const options=['case1','case2','case3','case4','case5']
 
 function handleCheck(value:string){
const index = checkStatus.indexOf(( checked:any) =>checked === value)
if(checkStatus.includes(value)){
  setCheckStatus(checkStatus.filter((item:any)=>item!==value))
  return;
}
setCheckStatus(checkStatus.concat(value))


 }
  return (
    <View style={styles.container}>
      <Text>Select your choose</Text>
      <View style={{flexDirection:'row'}}>
        {options.map((item)=>(
          <View style={{flexDirection:'row',justifyContent:'center',marginRight:10}}>
          <TouchableOpacity onPress={()=>handleCheck(item)} style={{width:15,height:15,borderWidth:2,borderColor:'red',marginRight:5}}>
            {checkStatus.includes(item) && <View style={{backgroundColor:'red',width:25,height:25}}></View>}
          </TouchableOpacity>
          <Text>{item}</Text>
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