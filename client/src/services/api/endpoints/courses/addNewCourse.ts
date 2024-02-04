import axios, { AxiosResponse } from "axios";
import { Curso } from "../../../../interfaces/models";
import apiBaseUrl from "../apiBaseUrl";


const addNewCourse = (curso: Curso): Promise<AxiosResponse<Curso>> => {
    return axios.post(`${apiBaseUrl}/api/courses`, curso)
}

export default addNewCourse