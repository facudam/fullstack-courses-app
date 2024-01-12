import axios from 'axios';
import fs from 'fs';
import { IMGUR_CLIENTID } from '../../config';

// Esta función maneja la carga de la imagen y devuelve la URL de la imagen en Imgur
export const uploadAndGetUrlImage = async (sampleFile: any): Promise<string> => {
    console.log('sampleFile:', sampleFile);
    const uploadPath = __dirname + '/uploads/' + sampleFile.name;
    
    // Utilizamos una promesa para envolver la operación asíncrona
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

    const imgurResponse = await axios.post(
        'https://api.imgur.com/3/image',
        {
            image: fs.readFileSync(uploadPath, 'base64'),
        },
        {
            headers: {
                Authorization: `Client-ID ${IMGUR_CLIENTID}`,
                'Content-Type': 'application/json',
            },
        }
    );

    fs.unlinkSync(uploadPath); // Eliminamos el archivo temporal después de subirlo a Imgur
    return imgurResponse.data.data.link;
};