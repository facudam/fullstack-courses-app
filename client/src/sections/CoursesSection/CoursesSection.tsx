import { FC, useEffect, useState } from 'react'
import getCourses from '../../services/api/endpoints/courses/getCourses';
import { Curso } from '../../interfaces/models';
import styles from './CoursesSection.module.css'
import Card from '../../components/card/Card';

const CoursesSection: FC = () => {

    const [ cursos, setCursos ] = useState<Curso[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ selectedLanguage, setSelectedLanguage ] = useState<string>('Spanish')

    const idiomas: string[] = ['Spanish', 'English', 'Italian', 'French']
    const autores: string[] = ['Miguel Angel Duran', 'Gonzalo Pozzo', 'Lucas Dalto', 'Fernando Herrera', 'Fazt']

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
        <section className={ styles.section }>
            <div className={ styles['filters-ctn'] }>
                <div className={ styles['btn-ctn'] }>
                    <button className={ styles['is-active'] }>Front-End</button>
                    <button>Back-End</button>
                    <button>Diseño UX/UI</button>
                    <button>Testing</button>
                </div>
                <div className={ styles['info-filters-ctn'] }>
                    <select
                        value={ selectedLanguage }
                        onChange={(e) => setSelectedLanguage(e.target.value)}>
                        {
                          idiomas.map((idioma, index) => (
                            <option
                              key={ index } 
                              value={ idioma } 
                            > { idioma }
                            </option>
                          ))
                        }
                    </select>
                    <select 
                        defaultValue='Autor'
                        onChange={(e) => console.log(e.target.value)}>
                        <option value="">Autor</option>
                        {
                          autores.map((autor, index) => (
                            <option 
                              key={ index } 
                              value={ autor } 
                            > { autor }
                            </option>
                          ))
                        }
                    </select>
                    <select defaultValue='Free' onChange={(e) => console.log(e.target.value)}>
                      <option>Free</option>
                      <option>Paid</option>
                    </select>
                </div>
            </div>
            <div className={ styles['card-section'] }>
                {
                isLoading 
                    ? <p>Cargando...</p>
                    : cursos.map(({ course_id, title, technology, image, author, is_free }) => (
                        <Card  
                          key={ course_id }
                          title={ title }
                          image={ image }
                          technology={ technology }
                          author={ author }
                          is_free={ is_free }
                        />
                    ))
                }
            </div>
        </section>
    )
}


export default CoursesSection