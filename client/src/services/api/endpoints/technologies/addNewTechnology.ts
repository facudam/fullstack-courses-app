import axios, { AxiosResponse } from "axios"
import { Technology } from "../../../../interfaces/models"
import apiBaseUrl from "../apiBaseUrl"


const addNewTechnology = (technology: Technology): Promise<AxiosResponse<Technology>> => {
    return axios.post(`${apiBaseUrl}/api/technologies`, technology)
}

export default addNewTechnology