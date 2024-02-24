import axios from "axios";
// import { Curso } from "../../../../interfaces/models";
import apiBaseUrl from "../apiBaseUrl";


const addNewCourse = (curso: unknown) => {
    return axios.post(`${apiBaseUrl}/api/courses`, curso)
}

export default addNewCourse