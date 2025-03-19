import { View, Text ,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import Selection from './Selection'
import { Dimensions } from 'react-native'
import { bibleEnAc,bibleEnBc,bibleKrBc,langArr,bibleArrEn,bibleArrKr } from '~/utils/selectionArray'

const {width,height}=Dimensions.get('window')

const SelectionGroup = ({lang,setLang,name,setName,theBible,setTheBible,verse,setVerse,page,setPage,toPage,setToPage,toVerse,setToVerse,toName,setToName}:any) => {
const [pgValue,setPgValue]=useState(1)

let arr = Array.from({ length: pgValue }, (v, k) => ({ title: k + 1, value: k + 1 }));
let arrV = Array.from({ length: 100 }, (v, k) => ({ title: k + 1, value: k + 1 }));

const [pgArr, setPgArr] = useState<any>(arr);

useEffect(() => {
  setPgArr(arr);
 
}, [pgValue]); // pgValue가 변경될 때만 us





  return (
    <View style={{justifyContent:'center',flexDirection:'column'}}>
  
    <View style={{flexDirection:'row'}}>

    <View style={[{backgroundColor:"white"},lang === "En"?{display:'none'}:styles.selectionView]}>
      {/* <Text style={{color:"black"}}>이름</Text> */}
    { theBible === "신약"?
      <Selection arr={bibleKrAc} text={name} setChange={setName} setPgValue={setPgValue} pgValue={pgValue} placeHolder={"이름"} btnWidth={width-320}/>:
      <Selection arr={bibleKrBc} text={name} setChange={setName} setPgValue={setPgValue} pgValue={pgValue} placeHolder={"이름"} btnWidth={width-320}/>
      
      }
    </View>
    
 

   
    <View style={[{backgroundColor:"white"},lang==="Kr"?{display:'none'}:styles.selectionView]}>
      
   {theBible ==="The New Testament"?
    <Selection arr={bibleEnAc} text={name} setChange={setName} setPgValue={setPgValue} pgValue={pgValue} placeHolder={"Name"} btnWidth={width-320}/>:
    <Selection arr={bibleEnBc} text={name} setChange={setName} setPgValue={setPgValue} pgValue={pgValue} placeHolder={"Name"} btnWidth={width-320}/>
    
    }
    </View>

    <View style={[{backgroundColor:"white",marginHorizontal:10},styles.selectionView]}>
      
    <Selection arr={pgArr} text={page} setChange={setPage} placeHolder={lang==="Kr"?"장":"Page"} btnWidth={width-320}/>
    </View>
    <View style={[{backgroundColor:"white"},styles.selectionView]}>
      {/* <Text style={{color:"black"}}>{lang==="Kr"?"절":"Verse"}</Text> */}
    <Selection arr={arrV} text={verse} setChange={setVerse} placeHolder={lang==="Kr"?"절":"Verse"} btnWidth={width-320} />
    </View>
    </View>

{/* ------------------------------------------------------------------- */}
<View style={{flexDirection:'row'}}>

    <View style={[{backgroundColor:"white"},lang === "En"?{display:'none'}:styles.selectionView]}>
      {/* <Text style={{color:"black"}}>이름</Text> */}
    { theBible === "신약"?
      <Selection arr={bibleKrAc} text={name} setChange={setName} setPgValue={setPgValue} pgValue={pgValue} placeHolder={"이름"} btnWidth={width-320}/>:
      <Selection arr={bibleKrBc} text={name} setChange={setName} setPgValue={setPgValue} pgValue={pgValue} placeHolder={"이름"} btnWidth={width-320}/>
      
      }
    </View>
    
    

   
    <View style={[{backgroundColor:'white'},lang==="Kr"?{display:'none'}:styles.selectionView]}>
      
   {theBible ==="The New Testament"?
    <Selection arr={bibleEnAc} text={toName} setChange={setToName} setPgValue={setPgValue} pgValue={pgValue} placeHolder={"Name"} btnWidth={width-320}/>:
    <Selection arr={bibleEnBc} text={toName} setChange={setToName} setPgValue={setPgValue} pgValue={pgValue} placeHolder={"Name"} btnWidth={width-320}/>
    
    }
    </View>

    <View style={[{backgroundColor:"white",marginHorizontal:10},styles.selectionView]}>
      
    <Selection arr={pgArr} text={toPage} setChange={setToPage} placeHolder={lang==="Kr"?"장":"Page"} btnWidth={width-320}/>
    </View>
    <View style={[{backgroundColor:"white"},styles.selectionView]}>
      {/* <Text style={{color:"black"}}>{lang==="Kr"?"절":"Verse"}</Text> */}
    <Selection arr={arrV} text={toVerse} setChange={setToVerse} placeHolder={lang==="Kr"?"절":"Verse"} btnWidth={width-320}/>
    </View>
    </View>


    </View>
  )
}

export default SelectionGroup
const styles = StyleSheet.create({
  selectionView: {
    flexDirection:'row',
    width:(width-68)/4,
    justifyContent:"center",
    alignItems:'center',
    // paddingHorizontal:14,
    borderRadius:5,
    height:30,
    borderBottomWidth:0.2,
    borderBottomColor:'gray',
    marginVertical:12
  },
  selectionView2:{
    flexDirection:'row',
    width:(width-58)/2,
    justifyContent:"center",
    alignItems:'center',
     marginVertical:8,
     
    borderRadius:5,
    height:30,
    borderBottomWidth:0.2,
    borderBottomColor:'gray'
  }
  
})