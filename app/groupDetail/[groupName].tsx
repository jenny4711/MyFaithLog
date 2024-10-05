import { View, Text,Alert } from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useGroupDataByGroupName } from '~/hooks/useFormData'
const GroupDetail = () => {
  const { groupName } = useLocalSearchParams()
const { data, isLoading, isError }: any = useGroupDataByGroupName(groupName);
const [groupData,setGroupData]=useState<any>(null)

 useEffect(()=>{
    if(data){
      setGroupData(data[0])
    }
 },[data])


  return (
    <View>
      <Text> {groupData?.groupName}</Text>
    </View>
  )
}

export default GroupDetail