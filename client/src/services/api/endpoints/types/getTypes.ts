import axios, { AxiosResponse } from "axios"
import { Types } from "../../../../interfaces/models"
import apiBaseUrl from "../apiBaseUrl"

const getTypes = async(): Promise<Types[]> => {
    try {
        const tipos: AxiosResponse<Types[]> = await axios.get(`${apiBaseUrl}/api/course-types`);
        return tipos.data
    } catch (error) {
        throw new Error(`Ha habido un error al intentar obtener la información: ${error}`);
    }   
}

export default getTypes