import {query, collection, doc, setDoc, updateDoc, getDocs,deleteDoc ,getDoc,where,orderBy} from 'firebase/firestore';
import { FIRESTORE_DB,FIREBASE_STORAGE } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import {useStorageContext} from '~/context/StorageContext'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
export   const saveDiaryEntry = async ({category,note,photo,date,title,content,meditation,application,pray,name,address,group}:any) => {
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
        address,
        group,
      }

    }else if(category === 'dailyQt'){
      data = {
        title,
        content,
        date,
        meditation,
        application,
        pray,
        address,
        group,
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

// my group section
export const saveGroup=async({groupName,creator,memo,member,blockMember,list,password}:any)=>{
  try{
    const email=await AsyncStorage.getItem('email')
    const data={
      groupName,
      creator,
      memo,
      member,
      blockMember,
      password,
      list,

    }

    let docRef;
    docRef = doc(FIRESTORE_DB, `groups/qt/list/${groupName}`);
    await setDoc(docRef, data);
  }catch(err){
    console.log(err,'error-saveGroup')
  }
}


export const getGroupData = async () => {
  try {
    const email = await AsyncStorage.getItem('email');
    if (!email) return;

    // Get all documents in the collection
    const groupCollection = collection(FIRESTORE_DB, 'groups/qt/list');
    const groupSnapshot = await getDocs(groupCollection);

    // Create an array to store group data
    const groupData:any = [];
    groupSnapshot.forEach((doc) => {
      groupData.push({ id: doc.id, ...doc.data() });
    });

    console.log(groupData, 'groupData');
    return groupData;
  } catch (error) {
    console.log(error, 'error-getGroupData');
  }
};

export const getGroupDataByGroupName=async(groupName:any)=>{
  try{
    const email=AsyncStorage.getItem('email')
    if(!email)return;
    const groupCollection=collection(FIRESTORE_DB,`groups/qt/list/`)
    const groupSnapshot= await getDocs(groupCollection)
    const groupData:any=[]
    groupSnapshot.forEach((doc)=>{
      if(doc.id===groupName){
        groupData.push({id:doc.id,...doc.data()})
      }
    })
 console.log(groupData,'groupData')
    return groupData
   
}catch(error){
  console.log(error,'error-getGroupDataByGroupName')
}


}

export const addDailyQtToGroup = async (date: string, groupName: string) => {
  try {
    // 이메일 가져오기 (웹 또는 앱에 따라)
    let email;
    if (Platform.OS === 'web') {
      email = localStorage.getItem('email');
    } else {
      email = await AsyncStorage.getItem('email');
    }

    if (!email || !date || !groupName || groupName ==='none') return;

    // dailyQt 카테고리에서 특정 항목을 가져옴
    const dailyQtDocRef = doc(FIRESTORE_DB, `users/${email}/dailyQt/${date}`);
    const dailyQtDocSnap = await getDoc(dailyQtDocRef);

    if (!dailyQtDocSnap.exists()) {
      console.log('No such document in dailyQt!');
      return;
    }

    const dailyQtData = dailyQtDocSnap.data();

    // groupName에 해당하는 그룹 데이터를 가져옴
    const groupDocRef = doc(FIRESTORE_DB, `groups/qt/${email}/${groupName}`);
    const groupDocSnap = await getDoc(groupDocRef);

    if (!groupDocSnap.exists()) {
      console.log('No such group!');
      return;
    }

    const groupData = groupDocSnap.data();
    
    // 기존의 list가 있으면 그 리스트에 새로운 dailyQt를 추가, 없으면 새로 만듦
    const updatedList = groupData.list ? [...groupData.list, dailyQtData] : [dailyQtData];

    // 그룹 데이터를 업데이트
    await updateDoc(groupDocRef, {
      list: updatedList
    });

    console.log('DailyQt entry added to group list successfully!');
  } catch (error) {
    console.log('Error adding DailyQt to group list: ', error);
  }
};





// ----------------------------------------------











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