import {query, collection, doc, setDoc, updateDoc, getDocs,deleteDoc ,getDoc,where,orderBy} from 'firebase/firestore';
import { FIRESTORE_DB,FIREBASE_STORAGE } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import {useStorageContext} from '~/context/StorageContext'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
export   const saveDiaryEntry = async ({category,note,photo,date,title,content,meditation,application,pray,name,address}:any) => {
  try {
    // const email=await AsyncStorage.getItem('email')
    let email;
if(Platform.OS==='web'){
  email=localStorage.getItem('email')
}else{
  email=await AsyncStorage.getItem('email')
}
console.log(email,'email')
    let data;
    if(category === 'sundayQt'){
      data = {
        title,
        content,
        photo,
        date,
        note,
        address
      }

    }else if(category === 'dailyQt'){
      data = {
        title,
        content,
        date,
        meditation,
        application,
        pray,
        address
    }
    }else if(category ==='thanks'){
      data={
        date,
        title,
        note,
        photo,
      }
    }else{
      data={
        date,
        title,
        photo,
      }

    }

    let docRef;

    docRef = doc(FIRESTORE_DB, `users/${email}/${category}/${date}`);;
    await setDoc(docRef, data);
   

 
  } catch (error) {
    console.log('Error updating document: ', error);
  }
};


export const getData = async (category: any, sortOrder: 'asc' | 'desc') => {
  try {
let email;
if(Platform.OS==='web'){
  email=localStorage.getItem('email')
}else{
  email=await AsyncStorage.getItem('email')
}
console.log(email,'email')

    // const email: any = await AsyncStorage.getItem('email');
    if (!email || !category) return;

    // Firestore 쿼리에서 정렬
    const qtCollection = collection(FIRESTORE_DB, `users/${email}/${category}`);
    const qtQuery = query(qtCollection, orderBy('date', 'desc')); // 'date' 필드 기준으로 정렬
    const qtsSnapshot = await getDocs(qtQuery);
    const qtData = qtsSnapshot.docs.map((doc) => doc.data() as any);

    return qtData;
  } catch (error) {
    console.log(error, 'error');
  }
};



export const deleteItem=async(category:any,date:any)=>{
  try{
    // const email = await AsyncStorage.getItem('email')

    let email;
if(Platform.OS==='web'){
  email=localStorage.getItem('email')
}else{
  email=await AsyncStorage.getItem('email')
}

    if(!email || !category || !date)return;
    const qtDoc = doc(FIRESTORE_DB, `users/${email}/${category}/${date}`);
   const qtSnap=await getDoc(qtDoc)
   if(!qtSnap.exists()){
     return
   }
    await deleteDoc(qtDoc)
    console.log('Document successfully deleted!')
  }catch(error){
    console.log(error,'error-deleteItem')
  }
}

//image uploading
export const uploadImageStorage = async (uri: any, fileType: any) => {
  try {
    const res = await fetch(uri);
    const blob = await res.blob();
    // const email = await AsyncStorage.getItem('email');
    const {email}=useStorageContext()
    const storageRef = ref(FIREBASE_STORAGE, `users/${email}/img/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error: any) => {
          console.log(error, 'error');
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            console.log('File available at', downloadUrl);
            resolve(downloadUrl); // Resolve the promise with the download URL
          });
        }
      );
    });
  } catch (error) {
    console.log(error, 'uploadImage');
    throw error;
  }
};