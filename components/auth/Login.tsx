import { View, Text , Platform,StyleSheet} from 'react-native';
import React from 'react';

import * as WebBrowser from 'expo-web-browser';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GoogleIcon } from '../../utils/Icons';
interface LoginProps{
  promptAsync:()=>void

}

if(Platform.OS !== 'web'){
  WebBrowser.maybeCompleteAuthSession();
}
const Login:React.FC<LoginProps> = ({promptAsync}) => {


  return (
    <>
   
    <View style={{backgroundColor:'#E8751A'}}>
      <TouchableOpacity style={[styles.googleBtn,{backgroundColor:'white'}]} onPress={()=>promptAsync()}>
        <GoogleIcon size={24}/>
      <Text style={{ color: 'black',fontWeight:700,marginLeft:10,fontSize:14}}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  googleBtn: { 
    marginTop:40,
    // backgroundColor: 'black', 
    width:200,
    height: 60,
    borderRadius: 24, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})