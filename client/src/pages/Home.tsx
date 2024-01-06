import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import apiBaseUrl from "../services/api/endpoints/apiBaseUrl";
import { Curso } from "../interfaces/models";
import getCourses from "../services/api/endpoints/courses/getCourses";
import MainLayout from "../layouts/MainLayout";
import { CoursesContext } from "../context/CoursesContext";
import { Header } from "../components/header/Header";


const Home: FC = () => {

    const { setIsAuthenticate, setUserName }   = useContext(CoursesContext)
    const [ cursos, setCursos ] = useState<Curso[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get(`${ apiBaseUrl }/api/validation`)
            .then(res => {
                if(res.data.valid) {
                  setIsAuthenticate(true)
                  setUserName(res.data.username)
                } else {
                    setIsAuthenticate(false)
                }
            })
            .catch(err => {
                console.log(`Ups, ha ocurrido un error: ${ err }`)
            })
    })

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const courses = await getCourses();
            setCursos(courses);
            setIsLoading(false)
          } catch (error) {
            console.error("Error al obtener los cursos:", error);
          }
        };
    
        fetchCourses();
      }, []);

  return (
    <MainLayout>
        <Header />
        <main>
            <h2>Lista de cursos:</h2>        
            {
              isLoading 
                ? <p>Cargando...</p>
                : cursos.map((curso) => (
                    <div key={ curso.course_id }>
                      <img src={ curso.image } alt="image" />
                      <h2>{ curso.title }</h2>
                      <p>{ curso.description }</p>
                    </div>
                ))
            }
        </main>
    </MainLayout>
  )
}

export default Home;
