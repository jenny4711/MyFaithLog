import { View, Text,Dimensions,TextInput,TouchableOpacity ,StyleSheet,ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import { saveGroup } from '~/utils/fireStoreFn'
import FirstGroupView from '~/components/myGroup/FirstGroupView'
import { useGroupListData } from '~/hooks/useFormData'
import CreateGroupForm from '~/components/myGroup/CreateGroupForm'
import GroupListItemBtn from '~/components/myGroup/GroupListItemBtn'
const {width,height} = Dimensions.get('window')

const exampleGroup=[
  {
    name:'아침 큐티',
    memo:'생명의 삶 큐티 하시는분 모임',
    creator:'jenny lee',
    member:['admin','user1','user2'],
    blockMember:['user3','user4']
  },
  {
    name:'group2',
    memo:'group2',
    creator:'admin2',
    member:['admin','user1','user2'],
    blockMember:['user3','user4']
  },
  {
    name:'group3',
    memo:'group3',
    creator:'admin3',
    member:['admin','user1','user2'],
    blockMember:['user3','user4']
  },
  {
    name:'group4',
    memo:'group4',
    creator:'admin4',
    member:['admin','user1','user2'],
    blockMember:['user3','user4']
  },
  {
    name:'group5',
    memo:'group5',
    creator:'admin5',
    member:['admin','user1','user2'],
    blockMember:['user3','user4']
  },
 
  
]



const MyGroup = () => {
  const [groupName,setGroupName] = useState('')
  const [memo,setMemo]=useState('')
  const [creator,setCreator]=useState('')
  const [member,setMember]=useState([])
  const [blockMember,setBlockMember]=useState([])
 const [password,setPassword]=useState('')
const [isCreateGp,setIsCreateGp]=useState(false)
const { data, isLoading, isError }: any = useGroupListData();


useEffect(() => {
  if (data) {
    console.log(data, 'eee'); // Ensure data is logged once fetched
  }
}, [data]);

 // Handle loading and error states
 if (isLoading) {
  return <Text>Loading...</Text>; // Optionally, add a loading spinner here
}

if (isError) {
  return <Text>Error fetching group data</Text>; // Handle error case
}


  return (
    <View style={{flex:1,backgroundColor:'#E8751A',alignItems:'center'}}>
      <FirstGroupView isCreateGp={isCreateGp} setIsCreateGp={setIsCreateGp}/>

     {isCreateGp && <CreateGroupForm blockMember={blockMember} groupName={groupName} creator={creator} memo={memo} password={password} setGroupName={setGroupName} setBlockMember={setBlockMember}setMember={setMember}/>}


<View style={[styles.eachView,{backgroundColor:'#E8751A'}]}>
<Text style={{marginTop:8,fontSize:16,fontFamily:'LineSeedKr-Bd'}}>그룹 리스트</Text>
<View style={styles.eachSecView}>
  <ScrollView style={{paddingBottom:50,backgroundColor:'#E8751A'}}>
{
  data?.map((group:any,index:any)=>(
   <GroupListItemBtn group={group} index={index}/>
  ))
}
</ScrollView>
</View>
</View>

    </View>
  )
}

export default MyGroup
const styles = StyleSheet.create({
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