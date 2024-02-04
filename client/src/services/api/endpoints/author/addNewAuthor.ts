import axios, { AxiosResponse } from "axios"
import { Author } from "../../../../interfaces/models"
import apiBaseUrl from "../apiBaseUrl"

const addNewAuthor = (author: Author): Promise<AxiosResponse<Author>> => {
    return axios.post(`${apiBaseUrl}/api/authors`, author)
}

export default addNewAuthor