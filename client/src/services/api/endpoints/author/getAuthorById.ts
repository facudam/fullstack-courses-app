import axios from "axios"
import { Author } from "../../../../interfaces/models"
import apiBaseUrl from "../apiBaseUrl"


const getAuthorById = async (id: number | undefined | null): Promise<Author> => {
    try {
        const response = axios.get(`${apiBaseUrl}/api/authors/${id}`)
        return (await response).data
    } catch (error) {
        throw new Error(`Ha habido un error al intentar obtener los datos: ${error}`)
    }
}

export default getAuthorById