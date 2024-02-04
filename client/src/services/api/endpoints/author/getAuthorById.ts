import axios, { AxiosResponse } from "axios"
import { Author } from "../../../../interfaces/models"
import apiBaseUrl from "../apiBaseUrl"


const getAuthorById = async (id: number | string): Promise<Author> => {
    try {
        const response: AxiosResponse<Author> = await axios.get(`${apiBaseUrl}/api/authors/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`Ha habido un error al intentar obtener los datos: ${error}`)
    }
}

export default getAuthorById