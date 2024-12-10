import { View, Text,Alert,ScrollView ,TouchableOpacity,Dimensions,TextInput,Button} from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useGroupDataByGroupName } from '~/hooks/useFormData'
import { useNavigation } from 'expo-router'
import { addUserToGroup, removeUserFromGroup } from '../../utils/fireStoreFn';
import { useGroupListData } from '../../hooks/useFormData';
import { useStorageContext } from '~/context/StorageContext'
import FirstGroupView from '~/components/myGroup/FirstGroupView'
import { saveReply } from '~/utils/fireStoreFn';
const {width} = Dimensions.get('window')

export async function generateStaticParams(item: any): Promise<Record<string, string>[]> {
  const dateArray = Array.isArray(item) ? item : [];

  dateArray.push({ groupName: '테스트' });

  return dateArray;
}





const GroupDetail = () => {
  const { groupName } = useLocalSearchParams()
const { data, isLoading, isError }: any = useGroupDataByGroupName(groupName);
const {data:gpData}=useGroupListData()
const {email}=useStorageContext()
const [groupData,setGroupData]=useState<any>(null)
const [addMyGroup,setAddMyGroup]=useState(false)
const [gpNameArray,setGpNameArray]=useState<any>([])
const [addReply,setAddReply]=useState<any>([])
const [reply,setReply]=useState('')
const [myStatus,setMyStatus]=useState(false)
const [open,setOpen]=useState(false)
const [selectedItem,setSelectedItem]=useState<any>(null)
useEffect(()=>{
  console.log(groupData,'groupData')
  if(groupData){
    if(groupData.member.includes(email)){
      setMyStatus(true)
    }else{
      setMyStatus(false)
    }
  }
},[groupData])


useEffect(()=>{
  if(reply){
    handleReply()
    console.log(reply,'reply')
  }
},[reply])


useEffect(()=>{
  if(gpData){
    const generatedGpNameArray = gpData.map((item:any)=>{
      return {groupName:item.groupName}
    })
    setGpNameArray(generatedGpNameArray)
  }
},[gpData])

useEffect(() => {
  async function fetchData() {
    // item이 배열인지 확인 후 generateStaticParams 호출
    const params = await generateStaticParams(gpNameArray);
    console.log(params);
  }
  fetchData();
}, [gpNameArray]);

console.log(email,'email')
 useEffect(()=>{
    if(data){
      setGroupData(data[0])
    }
 },[data])



const handleRemoveGroup=async(groupName:any)=>{
  try{
    await removeUserFromGroup(groupName)
    setMyStatus(false)
  }catch(error){
    console.log('Error removing user from group: ', error);
  }
}

const handleAddGroup=async(groupName:any)=>{
  try{
    await addUserToGroup(groupName)
    setMyStatus(true)
  }catch(error){
    console.log('Error adding user to group: ', error);
  }
}


const handleReply=()=>{
  setAddReply([...addReply,reply])
}

const handleSaveReply=async(date:any)=>{
  try{
    await saveReply(addReply,date)
   
  }catch(error){
    console.log('Error adding user reply: ', error);
  }
}

const toggleOpen=(index:any)=>{
  setSelectedItem(groupData.list[index])
  setOpen(!open)

}

  return (
    <View style={{flex:1,alignItems:'center',backgroundColor:'#E8751A'}}>
      <FirstGroupView setAddOnChange={handleAddGroup} myStatus={myStatus} groupName={groupData?.groupName}  setOnChange={handleRemoveGroup} onChange={addMyGroup} title={myStatus?'탈퇴하기':'나의그룹에넣기'}/>
      <Text style={{fontFamily:'LotteBd',fontSize:20,color:'#fff'}}> {groupData?.groupName}</Text>

      <ScrollView>
        {
        groupData?.list.map((item:any,index:any)=>(
          <View style={{backgroundColor:'white',width:width-48,padding:16,borderRadius:24,marginVertical:8}}>
          <TouchableOpacity onPress={()=>toggleOpen(index)}  key={index}>
             <Text style={{fontSize:18,fontFamily:'LineSeedKr-Bd'}}>{item.title}</Text>
             <Text style={{fontSize:18,fontFamily:'LineSeedKR-Rg'}}>{item.address}</Text>
             <Text style={{fontSize:18,fontFamily:'LineSeedKR-Rg'}}>{item.date}</Text>
             <Text style={groupData.creatorEmail!== email?{display:'none'}:{fontSize:15}}>{item.email}</Text>        
          </TouchableOpacity>
          { open && selectedItem===item && (
            <View style={{backgroundColor:'white',paddingRight:25,marginRight:15,marginTop:8,justifyContent:'flex-start',alignItems:'flex-start'}}>
              <View style={{flexDirection:'row',marginHorizontal:8,marginTop:8}}>
                <Text style={{fontSize:18,fontFamily:'LineSeedKr-Bd'}}>묵상:</Text>
                <Text style={{fontSize:18,fontFamily:'LineSeedKR-Rg'}}>{selectedItem.meditation}</Text>
              </View>

              <View style={{flexDirection:'row',marginHorizontal:8,marginTop:8}}>
                <Text style={{fontSize:18,fontFamily:'LineSeedKr-Bd'}}>적용:</Text>
              <Text style={{fontSize:18,fontFamily:'LineSeedKR-Rg'}}>{selectedItem.application}</Text>
              </View>

              <View style={{flexDirection:'row',marginHorizontal:8,marginTop:8}}>
             <Text style={{fontSize:18,fontFamily:'LineSeedKr-Bd'}}>기도:</Text>
              <Text style={{fontSize:18,fontFamily:'LineSeedKR-Rg'}}>{selectedItem.pray}</Text>
              </View>

              <View>
            <Text style={{fontSize:18,fontFamily:'LineSeedKr-Bd'}}>댓글</Text>
            <View style={{flexDirection:'row'}}>
            <TextInput style={{marginHorizontal:8,width:width-150}} onChangeText={setReply} value={reply} placeholder='댓글을 입력해주세요' />
            <Button title='입력' onPress={()=>handleSaveReply(selectedItem.date)} />
            </View>
          </View>
             
            </View>
          )
          }
        
          </View>
        ))
        }
      </ScrollView>
    </View>
  )
}

export default GroupDetail