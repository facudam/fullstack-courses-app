import axios, { AxiosResponse } from "axios";
import apiBaseUrl from "../apiBaseUrl";
import { Comment } from "../../../../interfaces/models";

const getCommentsByCourseId = async (id: number | undefined): Promise<Comment[]> => {
    try {
        const response: AxiosResponse<Comment[]> = await axios.get(`${apiBaseUrl}/api/comments/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`Lo sentimos, ha habido un error al intentar obtener la información: ${error}`)
    }
}

export default getCommentsByCourseId;
