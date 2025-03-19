import axios from 'axios';
const EXPO_PUBLIC_GEMINI_API_KEY=process.env.EXPO_PUBLIC_GEMINI_API_KEY
import api from './api';


// export const getAIResponse = async (lang:string,page:any,verse:any,name:any,toPage:any,toVerse:any,toName:any) => {
  
//     console.log(lang, 'EXPO_GEMINI_API_KEY');
//     try {
     
//   let msg;
//   if(lang==="Kr"){
//     msg = `기독교 성경책에서 ${name} ${page}장, ${verse}절 부터 ${toName} ${toPage}장,${toVerse} 구절만 알려주세요.`;
//   }else{
//     msg = `can you show me the verse from the book of ${name} chapter ${page}, verse ${verse} to chapter ${toPage}, verse ${toVerse} ,inthe NIV Bible?`;
//   }

     

  

  
    
//       const res = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${EXPO_PUBLIC_GEMINI_API_KEY}`,
//         {
//           "contents": [{
//               "parts":[
//                   {"text": msg}
//               ]
//           }],
//           "safetySettings": [
//               {
//                   "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
//                   "threshold": "BLOCK_ONLY_HIGH"
//               }
//           ],
//           "generationConfig": {
//               "stopSequences": [
//                   "Title"
//               ],
//               "temperature": 1.0,
//               "maxOutputTokens": 800,
//               "topP": 0.8,
//               "topK": 10
//         }
//       }
//       );
//       console.log(res.data.candidates, 'res.data-ai-canditates');
//       console.log(res.data.Text, 'res.data-ai');
      
//       const data:any = res.data.candidates[0].content.parts[0]?.text
//       if(data) {
//         const tipsArray=data.split("\n").map((tip:any)=>tip.trim())
//         .filter((tip:any)=>tip.length>0)
//         return tipsArray.join("\n\n")

//       }else{
//         return data
//       }
      
  
    
     
//     } catch (error:any) {
//       console.error('Error in getAIResponse:', error.response ? error.response.data : error.message);
//       throw error;
//     }
//   };


export const getBibleFromTo=async({title,bible,chapter,to,from}:any)=>{
  try{
    console.log(bible,'bible')
    const response=await api.get(`${bible}/fromTo/${title}/${chapter}/${from}/${to}`);
    console.log(response.data.result,'getBibleFromTo')
    return response.data?.result;
  }catch(error){
    console.log(error,'bibleapi-error')
  }
}


export const findFromChToCh=async({title,bible,fromCh,fromVs,toCh,toVs}:any)=>{
  console.log(title,bible,fromCh,fromVs,toCh,toVs,'findFromChToCh')
  try{
    const response=await api.get(`${bible}/findCh/${title}/${fromCh}/${fromVs}/${toCh}/${toVs}`);
    console.log(response.data.result,'findFromChToCh')
    return response.data?.result;
  }catch(error){
    console.log(error,'bibleapi-error')
  }
}




  
export const getAIResponse = async (
  lang: string,
  page: any,
  verse: any,
  name: any,
  toPage: any,
  toVerse: any,
  
) => {
 

  try {
    let msg;
    if (lang === "Kr") {
      msg = `새번역 성경전서 에서 ${name} ${page}장 전체 줄거리 만 요약해서 중학생 이 해할수있게 알려주세요.`;
    } else {
      msg = `Please provide the following Bible passage in NIV format:
      ${name} chapter ${page}, verses ${verse}.`;
      
    }
console.log(msg,'msg')
    // Replace with the correct Gemini API endpoint
    const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${EXPO_PUBLIC_GEMINI_API_KEY}`,
      {
        "contents": [{
            "parts": [
                {"text": msg}
            ]
        }],
        "safetySettings": [
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_ONLY_HIGH"
            }
        ],
        "generationConfig": {
              "stopSequences": [
                  "Title"
              ],
              "temperature": 0,
              "maxOutputTokens": 800,
              "topP": 1,
              "topK": 10
        }
      }
    );

    console.log(res.data, 'Full Response'); // Log for debugging

    // Check if response contains candidates (may vary with Gemini API)
    if (res.data && res.data.candidates) {
      const firstCandidate = res.data.candidates[0];
      if (firstCandidate.content && firstCandidate.content.parts) {
      console.log(firstCandidate.content.parts[0].text, 'First Candidate'); // Log for debugging
        return firstCandidate.content.parts[0].text;
      } else {
        console.log('Unexpected response format:', res.data);
        return "응답 형식이 예상과 다릅니다.";
      }
    } else {
      console.log('No candidates found in response:', res.data);
      return "응답에서 후보 텍스트를 찾을 수 없습니다.";
    }
  } catch (error: any) {
    console.log('Error in getAIResponse:', error.response ? error.response.data : error.message);
    throw error;
  }
};