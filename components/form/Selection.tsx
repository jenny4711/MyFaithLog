import { View, Text ,StyleSheet,Dimensions,SafeAreaView} from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const{width,height}=Dimensions.get('window')


const Selection = ({arr,setChange,setInit,placeHolder,btnWidth}:any) => {
 




  return (
   <>
   <SelectDropdown
   dropdownOverlayColor="transparent" 
  
    data={arr?arr:[]}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem,'selectedItem')
      console.log(selectedItem.init,'init~~~~~~~~~~~~~~~~~~~~')
    setChange(selectedItem.value)
    if (selectedItem && selectedItem.init) {
      console.log(selectedItem.init, 'init~~~~~~~~~~~~~~~~~~~~');
      setInit && setInit(selectedItem.init);
    } else {
      console.log('No init value in selectedItem');
    }
    
   console.log(selectedItem,'selectedItem')
    
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={[styles.dropdownButtonStyle,{width:btnWidth}]}>
         
          
          
          <Text style={[styles.dropdownButtonTxtStyle,{color:'white',fontSize:18}]}>
            {(selectedItem && selectedItem.title) || placeHolder}
          </Text>
          <Ionicons size={12} name={'chevron-expand-outline'} style={[styles.dropdownButtonArrowStyle]} color={'white'} />

        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...( {backgroundColor: 'white'})}}>

<View style={{width: 15}}> 
    {isSelected ? <Ionicons name={'checkmark'} style={styles.dropdownItemIconStyle} color={"white"}/> : null}
  </View>
         <Text style={[styles.dropdownItemTxtStyle,{color:"black",fontSize:18}]}>{item.title}</Text>
         
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
   
      </>
  )
}

export default Selection

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    //btnWidth
    // width: width-320,
    height: 50,
   
    borderRadius: 12,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 6,
   
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    
  },
  dropdownButtonArrowStyle: {
    fontSize: 15,
  },
  dropdownButtonIconStyle: {
    fontSize: 18,
    // marginRight: 8,
  },
  dropdownMenuStyle: {
    color: 'black',
    // backgroundColor:colors.text,
    
    borderRadius: 8,
    // width:400,
    
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
   
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 12,

    // marginRight: 8,
  },
});