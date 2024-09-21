import { Cloudinary } from '@cloudinary/url-gen';
import { upload ,UploadApiOptions } from 'cloudinary-react-native';
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { AdvancedImage } from 'cloudinary-react-native';
import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";

type UploadApiResponse = {
  public_id: string;
  url: string;
  secure_url: string;
  [key: string]: any; // 추가적으로 예상할 수 있는 필드들
};



export const cld = new Cloudinary({
  cloud: {
      cloudName: process.env.EXPO_PUBLIC_CLOUDNARY_CLOUD_NAME
  },
  url: {
      secure: true
  }
});

export const uploadImage = async (file: string) => {
  const options: UploadApiOptions = {
    upload_preset: 'default',
    unsigned: true,
    resource_type: 'auto',
    cropping:false,
  };

  return new Promise<UploadApiResponse>(async (resolve, reject) => {
   
    await upload(cld, {
      file,
      options: options,
      callback: (error, response) => {
        if (error || !response) {
          console.log(error, 'error-clouldNary');
          reject(error);
        } else {
          console.log(response, 'response-cloudNary');
          resolve(response);
        }
      },
    });
  });
};

