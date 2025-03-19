import { View, Text ,TouchableOpacity,Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStorageContext } from '~/context/StorageContext'
import { useBibleFromChToCh } from '~/hooks/useFormData'
import { useNavigation } from 'expo-router'
import { useRouter } from 'expo-router';
const {width} = Dimensions.get('window')
const BibleWithEdit = ({setOnChange,onChange}:any) => {
  const [visible,setVisible]=useState(false)
  const {init,setInit,name,setName,verse,setVerse,toVerse,setToVerse,page,setPage,toPage,setToPage,showContent,setShowContent}=useStorageContext()
  // const { data }: any = useBibleFromChToCh(visible ? { title: name, bible: init, fromCh: page, fromVs: verse, toCh: toPage, toVs: toVerse } : []);
const navigation = useNavigation()
const router = useRouter();
  useEffect(()=>{
    if(showContent.length >0){
      
      setOnChange(showContent)
    }
  },[showContent])



const goToChooseBibleSec=()=>{

  router.back();
  setTimeout(()=>{
    return (navigation as any).navigate('chooseBibleSec')
  },300)
 
}





  return (
    <TouchableOpacity style={{width:width-48,justifyContent:'center',alignItems:'center'}} onPress={()=>goToChooseBibleSec()}>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

export default BibleWithEdit