import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveWithoutEmail = async (
  
 
{  title,
  content,
  date,
  meditation,
  application,
  pray,
  address,
  name,
}:any
) => {
  try {
    const existingData = await AsyncStorage.getItem('dailyData');
    let parsedData = existingData ? JSON.parse(existingData) : [];

   

    // 1. 기존 데이터 중 해당 날짜의 항목 찾기
    const hasIsToday = parsedData.some((item: any) => item.date === date);

    if (hasIsToday) {
      // 2. 기존 데이터를 유지하면서 수정 (map 사용)

   
      parsedData = parsedData.map((item: any) =>
        item.date === date
          ? {
              ...item,
              title,
              content,
              date,
              meditation,
              application,
              pray,
              address,
              name,
            }
          : item
      );
    } else {
      // 3. 기존 데이터가 없다면 새로운 데이터 추가


    
      parsedData.push({
        title,
        content,
        date,
        meditation,
        application,
        pray,
        address,
        name
      });
    }

    // 4. 업데이트된 데이터 저장
    await AsyncStorage.setItem('dailyData', JSON.stringify(parsedData));
     await AsyncStorage.getItem('dailyData');
 

  } catch (error) {
    console.log(error, 'error');
  }
};




export const saveSunday = async (
  
 
  {  title,
    content,
    date,
    note,
    photo,
    address,
    name,
  }:any
  ) => {
    try {
      const existingData = await AsyncStorage.getItem('sundayData');
      let parsedData = existingData ? JSON.parse(existingData) : [];
  
     
  
      // 1. 기존 데이터 중 해당 날짜의 항목 찾기
      const hasIsToday = parsedData.some((item: any) => item.date === date);
  
      if (hasIsToday) {
        // 2. 기존 데이터를 유지하면서 수정 (map 사용)
  
     
        parsedData = parsedData.map((item: any) =>
          item.date === date
            ? {
                ...item,
                title,
                content,
                date,
                note,
                photo,
                address,
                name
              }
            : item
        );
      } else {
        // 3. 기존 데이터가 없다면 새로운 데이터 추가
  
  
      
        parsedData.push({
          title,
          content,
          date,
          note,
          photo,
          address,
          name
        });
      }
  
      // 4. 업데이트된 데이터 저장
      await AsyncStorage.setItem('sundayData', JSON.stringify(parsedData));
       await AsyncStorage.getItem('sundayData');
   
  
    } catch (error) {
      console.log(error, 'error');
    }
  };






export const getDailyData = async () => {
  try {
    const data = await AsyncStorage.getItem("dailyData");
    let parsedData = data ? JSON.parse(data) : [];

    

console.log(parsedData,'parsedData')
    

  
    // await AsyncStorage.setItem("dailyData", JSON.stringify(parsedData));

    // Return the updated data
    
    return parsedData;
  } catch (error) {
    console.error("Failed to fetch emotion data:", error);
    return [];
  }
};



export const getSundayData = async () => {
  try {
    const data = await AsyncStorage.getItem('sundayData');
    let parsedData = data ? JSON.parse(data) : [];

    

console.log(parsedData,'parsedData')
    

  
    // await AsyncStorage.setItem("dailyData", JSON.stringify(parsedData));

    // Return the updated data
    
    return parsedData;
  } catch (error) {
    console.error("Failed to fetch emotion data:", error);
    return [];
  }
};


export const deletedWithoutEmail = async (date:any) => {
  const existingData = await AsyncStorage.getItem('dailyData');
  const parsedData = existingData ? JSON.parse(existingData) : [];

  const targetDateToDelete = date;

  const indexToDelete = parsedData.findIndex(
    (item: any) => item.date === targetDateToDelete
  );

  if (indexToDelete !== -1) {
    parsedData.splice(indexToDelete, 1);

    await AsyncStorage.setItem('dailyData', JSON.stringify(parsedData));
  } else {
    console.log('No entry found for the given date to delete.');
  }
};



export const deletedSunday = async (date:any) => {
  const existingData = await AsyncStorage.getItem('sundayData');
  const parsedData = existingData ? JSON.parse(existingData) : [];

  const targetDateToDelete = date;

  const indexToDelete = parsedData.findIndex(
    (item: any) => item.date === targetDateToDelete
  );

  if (indexToDelete !== -1) {
    parsedData.splice(indexToDelete, 1);

    await AsyncStorage.setItem('sundayData', JSON.stringify(parsedData));
  } else {
    console.log('No entry found for the given date to delete.');
  }
};


export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    await getDailyData()
    console.log("All data cleared successfully!");
  } catch (error) {
    console.error("Error clearing all data:", error);
  }
};


export const saveImageLocally = async (uri: string) => {
  try {
    const existingImages = await AsyncStorage.getItem("localImages");
    const parsedImages = existingImages ? JSON.parse(existingImages) : [];
    const updatedImages = [...parsedImages, uri];
    await AsyncStorage.setItem("localImages", JSON.stringify(updatedImages));
  } catch (error) {
    console.error("Error saving image locally:", error);
  }
};