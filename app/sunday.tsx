import { View, Text ,ScrollView,Dimensions,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useData } from '~/hooks/useFormData'
import Animated,{Easing,FadeInLeft} from 'react-native-reanimated'
import SundayListItem from '~/components/list/SundayListItem'
import ListFirstView from '~/components/list/ListFirstView'
const {width} = Dimensions.get('window')

const Sunday = () => {
  const [category,setCategory]=useState('sundayQt')
  const [formData,setFormData]=useState([])
const {data}=useData(category)
console.log(data,'data')
  return (
    <View style={{flex:1,backgroundColor:'#E8751A',justifyContent:'center',alignItems:'center',paddingTop:16}}>
      <ListFirstView title={'주일말씀'} />
     <ScrollView>
      {
        data?.map((item:any,index:any) => (
          <Animated.View entering={FadeInLeft.duration(500).easing(Easing.ease)} style={styles.itemView} key={index}>
          <SundayListItem key={item.id} item={item} />
          </Animated.View>
        ))
      }
     </ScrollView>
    </View>
  )
}

export default Sunday
const styles=StyleSheet.create({
  itemView:{
    backgroundColor:'white',
    width:width-48,
    marginVertical:8,
    paddingHorizontal:10,
    paddingVertical:10
    ,borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  }
})