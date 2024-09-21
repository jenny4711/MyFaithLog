import React, { createContext, useContext, useState,useEffect } from 'react';

interface StorageContextType {
  email:any;
  setEmail:(email:any)=>void;
}

const StorageContext = createContext<StorageContextType >('' as any);
export const StorageProvider=({children}:{children:React.ReactNode})=>{
  const [email,setEmail]=useState<any>('')
  return (
    <StorageContext.Provider value={{email,setEmail}}>
      {children}
    </StorageContext.Provider>
  )
}

export const useStorageContext=()=>useContext(StorageContext)