import axios, { AxiosResponse } from "axios"
import { Language } from "../../../../interfaces/models"
import apiBaseUrl from '../apiBaseUrl';


const getLanguages = async(): Promise<Language[]> => {
    try {
        const response: AxiosResponse<Language[]> = await axios.get(`${apiBaseUrl}/api/course-languages`);
        return response.data
    } catch (error) {
        throw new Error(`Ha habido un error al intentar obtener la información: ${error}`);
    }  
}

export default getLanguages