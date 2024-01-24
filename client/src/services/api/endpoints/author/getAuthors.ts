import axios, { AxiosResponse } from "axios";
import { Author } from "../../../../interfaces/models";
import apiBaseUrl from "../apiBaseUrl";

const getAuthors = async(): Promise<Author[]> => {
    try {
        const autores: AxiosResponse<Author[]> = await axios.get(`${apiBaseUrl}/api/authors`)
        return autores.data
    } catch (error) {
        throw new Error(`Lo sentimos, ha habido un error: ${ error }`)
    }
}

export default getAuthors;