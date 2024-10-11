import { View, Text,Alert,ScrollView ,TouchableOpacity,Dimensions} from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useGroupDataByGroupName } from '~/hooks/useFormData'
import { useNavigation } from 'expo-router'
import { addUserToGroup } from '../../utils/fireStoreFn';
import { useGroupListData } from '../../hooks/useFormData';
import { useStorageContext } from '~/context/StorageContext'
import FirstGroupView from '~/components/myGroup/FirstGroupView'
const {width} = Dimensions.get('window')

export async function generateStaticParams(item: any): Promise<Record<string, string>[]> {
  const dateArray = Array.isArray(item) ? item : [];

  dateArray.push({ groupName: '테스트' });

  console.log(dateArray, 'dateArray');
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
console.log(gpData,'gpData')


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


 useEffect(()=>{
    if(data){
      setGroupData(data[0])
    }
 },[data])

 useEffect(()=>{
  async function addGroup(groupName:any){
    try{
      await addUserToGroup(groupName)
    }catch(error){
      console.log('Error adding user to group: ', error);
    }
   
    
  }
  
if(addMyGroup){
  addGroup(groupName)
}
 },[addMyGroup])


  return (
    <View style={{flex:1,alignItems:'center',backgroundColor:'#E8751A'}}>
      <FirstGroupView setOnChange={setAddMyGroup} onChange={addMyGroup} title={addMyGroup?'탈퇴하기':'리스트넣기'}/>
      <Text> {groupData?.groupName}</Text>

      <ScrollView>
        {
        groupData?.list.map((item:any,index:any)=>(
          <TouchableOpacity style={{backgroundColor:'white',width:width-48,padding:16,borderRadius:24}} key={index}>
             <Text>{item.title}</Text>
             <Text>{item.address}</Text>
             <Text>{item.date}</Text>
             <Text style={groupData.creatorEmail!== email?{display:'none'}:{fontSize:15}}>{item.email}</Text>        
          </TouchableOpacity>
        ))
        }
      </ScrollView>
    </View>
  )
}

export default GroupDetail