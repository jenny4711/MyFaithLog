import React,{useState,useEffect,useRef} from 'react';

import { Text,TouchableOpacity ,Platform,View} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomBottomSheet,{Ref} from '~/components/form/CustomBottomSheet';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import { QueryClientProvider ,QueryClient} from '@tanstack/react-query';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StorageProvider } from '~/context/StorageContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
//npm run export -build dist
//https://chatgpt.com/share/66ee6506-72ac-8013-900e-c31abeaa3391
export const unstable_settings = {
  initialRouteName:"index",
}

const queryClient = new QueryClient()

const Layout = () => {
  return (
    <>
    <StatusBar style="auto" />
    <GestureHandlerRootView style={{flex:1}}>
     <Stack>
     <Stack.Screen name="index" options={{headerShown:false}} />
     <Stack.Screen name="home" options={{headerShown:false}} />
     <Stack.Screen name="setting" options={{headerShown:false}} />
     <Stack.Screen name="dailyqt" options={{headerShown:false,presentation:'modal'}} />
     <Stack.Screen name="sunday" options={{headerShown:false,presentation:'modal'}} />
     <Stack.Screen name="source" options={{headerShown:false,presentation:'modal'}} />
     <Stack.Screen name="thanks" options={{headerShown:false,presentation:'modal'}} />
     <Stack.Screen name="form" options={{headerShown:false,presentation:'modal'}} />
     <Stack.Screen name="dailyqtDetail/[date]" options={{headerShown:false,presentation:'modal'}} />
     <Stack.Screen name="sundayDetail/[date]" options={{headerShown:false,presentation:'modal'}} />
     <Stack.Screen name="sourceDetail/[date]" options={{headerShown:false,presentation:'modal'}} />
   
 
     </Stack>
 
    </GestureHandlerRootView>
    </>
  )
}

export default function App(){
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // const bottomSheetRef = useRef<Ref>(null);
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 1000);

useEffect(()=>{
  async function loadFonts() {
    try{
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
   
        'LineSeedKr-Bd': require('../assets/fonts/LINESeedKR-Bd.ttf'),
        'LineSeedKR-Rg': require('../assets/fonts/LINESeedKR-Rg.ttf'),
        'LineSeedKR-Th': require('../assets/fonts/LINESeedKR-Th.ttf'),
        'LineSeed-Bd': require('../assets/fonts/LINESeedSans_A_Bd.ttf'),
        'LineSeed-He': require('../assets/fonts/LINESeedSans_A_He.ttf'),
        'LineSeed-Rg': require('../assets/fonts/LINESeedSans_A_Rg.ttf'),
        'LineSeed-XBd': require('../assets/fonts/LINESeedSans_A_XBd.ttf'),
        'LotteBd': require('../assets/fonts/12LotteMartDreamBold.ttf'),
        'LotteRg': require('../assets/fonts/12LotteMartDreamMedium.ttf'),
        'LotteTh': require('../assets/fonts/12LotteMartDreamLight.ttf'),
      });
      setFontsLoaded(true);
    }catch(error){
      console.log(error,'fontError');
    }finally{
      await SplashScreen.hideAsync();
    }
   
  }
  loadFonts();
},[])
if(Platform.OS==='web'){
  const webClientId:any=process.env.EXPO_PUBLIC_WEB_CLIENT_ID
  return(
    <GoogleOAuthProvider clientId={webClientId}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <StorageProvider>
  <QueryClientProvider client={queryClient}>
    <Layout />
    {/* <CustomBottomSheet ref={bottomSheetRef} title="Bottom Sheet Title" /> */}
  </QueryClientProvider>
  </StorageProvider>
</GestureHandlerRootView>
</GoogleOAuthProvider>
  )
}


  return(
  
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StorageProvider>
    <QueryClientProvider client={queryClient}>
      <Layout />
      {/* <CustomBottomSheet ref={bottomSheetRef} title="Bottom Sheet Title" /> */}
    </QueryClientProvider>
    </StorageProvider>
  </GestureHandlerRootView>
   
   
  )

}