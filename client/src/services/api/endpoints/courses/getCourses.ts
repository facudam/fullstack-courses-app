import axios, { AxiosResponse } from "axios";
import { Curso } from "../../../../interfaces/models";
import apiBaseUrl from "../apiBaseUrl";

const getCourses = async (): Promise<Curso[]> => {
    try {
      const response: AxiosResponse<Curso[]> = await axios.get(`${apiBaseUrl}/api/courses`);
      console.log(response)
      return response.data;
    } catch (error: unknown) {
      throw new Error(`Ha habido un error al intentar obtener los cursos: ${error}`);
    }
}

export default getCourses;


