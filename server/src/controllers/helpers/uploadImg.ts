import { API_KEY, API_SECRET, CLOUD_NAME } from '../../config';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET 
});

export const uploadAndGetUrlImage = async (sampleFile: any) => {
  const uploadPath = __dirname + '/uploads/' + sampleFile.name;
    
  const moveFilePromise = new Promise<void>((resolve, reject) => {
    sampleFile.mv(uploadPath, (err: unknown) => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
  });

  await moveFilePromise;

  try {
    const cloudinaryResult = await cloudinary.uploader.upload(uploadPath);
    fs.unlinkSync(uploadPath);
    return cloudinaryResult.secure_url
  } catch (error) {
    throw new Error('Ha habido un error con cloudinary: ' + error)
  }
};
