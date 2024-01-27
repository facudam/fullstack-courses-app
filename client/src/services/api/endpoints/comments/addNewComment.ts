import axios, { AxiosResponse } from "axios";
import apiBaseUrl from "../apiBaseUrl";
import { CommentResponse, Comment } from "../../../../interfaces/models";


const addNewComment = (comentario: CommentResponse): Promise<AxiosResponse<Comment>> => {
    return  axios.post(`${apiBaseUrl}/api/comments`, comentario )
}

export default addNewComment;