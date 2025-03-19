import { View, Text ,TouchableOpacity,Dimensions} from 'react-native'
import React,{useState} from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('window')
const DatePicker = ({
  month,
  setMonth,
  year,
  setYear,
  fullDate,
  setFullDate,
  date,setDate,
  isDatePickerVisible, 
  title,
  setDatePickerVisibility}:any) => {
    const [dateKr,setDateKr]=useState('')
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm =async (date:any) => {
   
    const getDate= new Date(date).getDate()
    const getMonth= new Date(date).getMonth()+1
    const getFullYear= new Date(date).getFullYear()
    const newDate = `${getMonth}-${getDate}-${getFullYear}`
    await AsyncStorage.setItem('date',newDate)
    setDate(getDate)
    setMonth(getMonth)
    setYear(getFullYear)
    setFullDate(newDate)
    setDateKr(`${getMonth}.${getDate}.${getFullYear}`)
    
 
    hideDatePicker();
  };

  return (
    <View style={{width: width -96}}>
      
     <TouchableOpacity style={{backgroundColor:'white',paddingVertical:10,paddingHorizontal:10,borderRadius:10,alignItems:'center'}} onPress={showDatePicker}>
      <Text style={{fontFamily:"LineSeedKr-Bd",fontSize:18}}>{fullDate !==""?dateKr : title}</Text>
     </TouchableOpacity>
      <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
    </View>
  )
}

export default DatePicker