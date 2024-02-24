import axios, { AxiosResponse } from "axios"
import { Technology } from "../../../../interfaces/models"
import apiBaseUrl from '../apiBaseUrl';

const getTechnologies = async(): Promise<Technology[]> => {
    try {
        const response: AxiosResponse<Technology[]> = await axios.get(`${apiBaseUrl}/api/technologies`);
        return response.data
    } catch (error) {
        throw new Error(`Ha habido un error al intentar obtener la información: ${error}`);
    }  
}

export default getTechnologies