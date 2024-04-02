import { API_KEY, API_SECRET, CLOUD_NAME } from '../../config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET 
});

export const uploadAndGetUrlImage = async (sampleFile: any) => {
  // Directorio temporal proporcionado por AWS Lambda
  const tmpDir = '/tmp';
  const uploadPath = path.join(tmpDir, sampleFile.name);
    
  // Mover el archivo a la carpeta temporal
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
    // Subir el archivo a Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(uploadPath);
    // Borrar el archivo de la carpeta temporal
    fs.unlinkSync(uploadPath);
    return cloudinaryResult.secure_url;
  } catch (error) {
    throw new Error('Ha habido un error con cloudinary: ' + error);
  }
};
