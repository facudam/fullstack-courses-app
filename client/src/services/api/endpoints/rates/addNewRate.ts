import axios, { AxiosResponse } from "axios";
import { Rate } from "interfaces/models";
import apiBaseUrl from "../apiBaseUrl";


export const addNewRate = (rate: number, course_id: number | undefined, user_id: number | undefined): Promise<AxiosResponse<Rate>> => {
    return axios.post(`${apiBaseUrl}/api/ratings`, { rate, course_id, user_id } )
}