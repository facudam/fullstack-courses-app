import axios, { AxiosResponse } from 'axios'
import { Curso } from "../../../../interfaces/models";
import apiBaseUrl from '../apiBaseUrl';


const getCourseById = async (id: number | undefined | null): Promise<Curso> => {
    try {
        const response: AxiosResponse<Curso> = await axios.get(`${apiBaseUrl}/api/courses/${id}`);
        return response.data
    } catch (error) {
        throw new Error(`Ha habido un error al intentar obtener el curso: ${error}`);
    }
}

export default getCourseById;