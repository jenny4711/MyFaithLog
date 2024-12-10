import React, { createContext, useContext, useState,useEffect } from 'react';

interface StorageContextType {
  email:any;
  setEmail:(email:any)=>void;
  dateF:any;
  setDateF:(dateF:any)=>void;
  showContent:any;
  setShowContent:(showContent:any)=>void;
  verse:any;
  setVerse:(verse:any)=>void;
  toVerse:any;
  setToVerse:(toVerse:any)=>void;
  page:any;
  setPage:(page:any)=>void;
  toPage:any;
  setToPage:(toPage:any)=>void;
  name:any;
  setName:(name:any)=>void;
  init:any;
  setInit:(init:any)=>void;
  img:any;
  setImg:(img:any)=>void;
  titleFont:any;
  setTitleFont:(titleFont:any)=>void;
  contentFont:any;
  setContentFont:(contentFont:any)=>void;
  aiAnswer:any;
  setAiAnswer:(aiAnswer:any)=>void;
  lang:any;
  setLang:(lang:any)=>void;
  



}

const StorageContext = createContext<StorageContextType >('' as any);
export const StorageProvider=({children}:{children:React.ReactNode})=>{
  const [email,setEmail]=useState<any>('')
  const [dateF,setDateF]=useState<any>('')
  const [showContent, setShowContent] = useState([]) as any || [];
  const [verse, setVerse] = useState<any>('');
  const [toVerse, setToVerse] = useState<any>('');
  const [page, setPage] = useState<any>('');
  const [toPage, setToPage] = useState<any>('');
  const [name,setName]=useState<any>('목록')
  const [init,setInit]=useState<any>('')
 const [img,setImg]=useState<any>('')
 const [titleFont,setTitleFont]=useState<any>(20)
 const [contentFont,setContentFont]=useState<any>(16)
 const [aiAnswer,setAiAnswer]=useState<any>('')
const [lang,setLang]=useState<any>('Kr')
  useEffect(()=>{
  console.log(init,'init!StorageContext!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  },[name])
  return (
    <StorageContext.Provider value={{lang,setLang,aiAnswer,setAiAnswer,titleFont,setTitleFont,contentFont,setContentFont,setImg,img,init,setInit,name,setName,showContent,setShowContent,verse,setVerse,toVerse,setToVerse,page,setPage,setToPage,toPage,email,setEmail,dateF,setDateF}}>
      {children}
    </StorageContext.Provider>
  )
}

export const useStorageContext=()=>useContext(StorageContext)