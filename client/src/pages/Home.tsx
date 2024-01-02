import axios from "axios";
import { useEffect, useState } from "react";
import apiBaseUrl from "../services/api/endpoints/apiBaseUrl";
import { Curso } from "../interfaces/models";
import getCourses from "../services/api/endpoints/courses/getCourses";
import { Link } from "react-router-dom";


const Home = () => {

    const [ name, setName ] = useState<string>('')
    const [ cursos, setCursos ] = useState<Curso[]>([])
    const [ isAuthenticate, setIsAuthenticate ] = useState<boolean>()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    axios.defaults.withCredentials = true

    const handleLogout =  () => {
        axios.post(`${ apiBaseUrl }/logout`)
            .then(() => setIsAuthenticate(false))
            .catch((error) => { console.log(error) })
    }
    

    useEffect(() => {
        axios.get(`${ apiBaseUrl }/api/validation`)
            .then(res => {
                if(res.data.valid) {
                  setIsAuthenticate(true)
                  setName(res.data.username)
                } else {
                    setIsAuthenticate(false)
                }
            })
            .catch(err => {
                console.log(`Ups, ha ocurrido un error: ${ err }`)
            })
    }, [])

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
    <div>
        {
          isAuthenticate
            ? <>
                <p>Hola { name }</p>
                <button onClick={handleLogout}>Logout</button>
              </>
            : <>
                <Link to='/login'>Log in</Link>
                <Link to='/signup'>Sign up</Link>
              </>
        }
        
        <main>
            <h1>Lista de cursos:</h1> 
            
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
    </div>
    
  )
}

export default Home;
