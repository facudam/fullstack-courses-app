import axios from 'axios';
import { URL_EMAILSENDER } from '../../config';

interface Data {
    name: string,
    email: string,
    token: string
}

const sendEmailConfirmation= async(data: Data) => {
    const { name, email, token } = data;
    
    try {
        const response = await axios.post(`${URL_EMAILSENDER}/send-email`, { name, email, token });
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}

export { sendEmailConfirmation }