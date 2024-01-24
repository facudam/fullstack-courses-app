import { FC, useEffect, useState } from 'react'
import styles from './CoursesSection.module.css'
import getCourses from '../../services/api/endpoints/courses/getCourses';
import { Curso } from '../../interfaces/models';
import Card from '../../components/card/Card';
import  useTypes  from '../../hooks/UseTypes';
import useLanguage from '../../hooks/UseLanguage';
import useAuthor from '../../hooks/UseAuthor';

const CoursesSection: FC = () => {

    const [ cursos, setCursos ] = useState<Curso[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ selectedLanguage, setSelectedLanguage ] = useState<string>('Spanish')
    const { types } = useTypes()
    const { language } = useLanguage()
    const { authors } = useAuthor()

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
                    {
                      types.map((tipo) => (
                        <button
                          className={ styles['is-active'] } 
                          key={ tipo.type_id }>{ tipo.type_name }
                        </button>
                      ))
                    }
                </div>
                <div className={ styles['info-filters-ctn'] }>
                    <select
                        value={ selectedLanguage }
                        onChange={(e) => setSelectedLanguage(e.target.value)}>
                          <option value=''>Idioma</option>
                        {
                          language.map((idioma) => (
                            <option
                              key={ idioma.language_id } 
                              value={ idioma.language_name } 
                            > { idioma.language_name }
                            </option>
                          ))
                        }
                    </select>
                    <select 
                        defaultValue='Autor'
                        onChange={(e) => console.log(e.target.value)}>
                        <option value="">Autor</option>
                        {
                          authors.map((autor) => (
                            <option 
                              key={ autor.author_id } 
                              value={ autor.author_name } 
                            > { autor.author_name }
                            </option>
                          ))
                        }
                    </select>
                    <select defaultValue='costo' onChange={(e) => console.log(e.target.value)}>
                      <option value={''}>Costo</option>
                      <option value={ 1 }>Gratis</option>
                      <option value={ 0 }>Pago</option>
                    </select>
                </div>
            </div>
            <div className={ styles['card-section'] }>
                {
                isLoading 
                    ? <p>Cargando...</p>
                    : cursos.map(({ course_id, title, technology, image, author, is_free }) => (
                        <Card  
                          id={ course_id }
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