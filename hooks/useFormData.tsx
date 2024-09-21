import { useQuery, useQueryClient ,useMutation} from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { saveDiaryEntry ,getData ,deleteItem} from '~/utils/fireStoreFn';
import { getBibleFromTo ,findFromChToCh} from '~/utils/ai';

export const useBibleFromTo = ({ title, bible, chapter, to, from }: any) => {
  return useQuery({
    queryKey: ['data', title, bible, chapter, to, from],
    queryFn: async () => {
      if (!title) {
        return null;
      }
      const result = await getBibleFromTo({ title, bible, chapter, to, from });
      console.log(typeof result, 'result-bible');
      return result;
    },
    enabled: !!title,
    staleTime: 0,
    select: (data) => {
      console.log(typeof data, 'data-bible');
      return data || null;
    },
  });
};


export const useBibleFromChToCh=({title,bible,fromCh,fromVs,toCh,toVs}:any)=>{
  return useQuery({
    queryKey:['data',title,bible,fromCh,fromVs,toCh,toVs],
    queryFn:async()=>{
      if(!title){
        return null;
      }
      const result=await findFromChToCh({title,bible,fromCh,fromVs,toCh,toVs});
      console.log(typeof result,'result-bible');
      return result;
    },
    enabled:!!title,
    staleTime:0,
    select:(data)=>{
      console.log(typeof data,'data-bible');
      return data || null;
    }
  })
}




export const useSaveData=({category,note,photo,date,title,content,meditation,application,pray,name,address}:any)=>{
  const queryClient=useQueryClient()

  return useMutation({
    mutationFn: ({category,note,photo,date,title,content,meditation,application,pray,name,address}: { category: any; note: any; photo: any; date: any; title: any; content: any;meditation:any,application:any,pray:any;name:any,address:any }) => {
      return saveDiaryEntry({category,note,photo,date,title,content,meditation,application,pray,name,address});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['data',category]});
    },
  });
}



export const useData=(category:any) => {
  return useQuery({
    queryKey: ['data',category],
    queryFn: () => {
      if(!category){
        return '' || [];
      }
      return getData(category);
    },
    enabled: !!category,
    staleTime:0,
    select:(data)=>{

      return data || [];
    }
  })
}



export const useDeletedData=({category,date}:any)=>{
  const queryClient=useQueryClient()
  const navigation = useNavigation()  
  return useMutation({
    mutationFn: ({category,date}: { category: any; date: any }) => {
      return deleteItem(category,date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['data',category]});
      (navigation as any).navigate('dailyqt')
    },

  })
}




