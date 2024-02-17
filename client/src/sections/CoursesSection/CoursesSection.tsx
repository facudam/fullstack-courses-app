import { FC, useContext, useEffect, useState } from 'react'
import styles from './CoursesSection.module.css'
import getCourses from '../../services/api/endpoints/courses/getCourses';
import { Curso } from '../../interfaces/models';
import Card from '../../components/card/Card';
import { useAuthor, useLanguage, useTypes } from '../../hooks';
import { filterByAuthor, filterByFree, filterByLanguage, filterByTechnology, filterByType, filterByCertification } from '../../helpers/filters';
import { CoursesContext } from '../../context/CoursesContext';
import NoCoursesComponent from '../../components/noCoursesComponent/NoCourses';

const CoursesSection: FC = () => {

    const { technology } = useContext(CoursesContext)

    const [ cursos, setCursos ] = useState<Curso[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ selectedLanguage, setSelectedLanguage ] = useState<string>('')
    const [ type, setType ] = useState<string>('Front-End')
    const [ author, setAuthor ] = useState<string>('')
    const [ costo, setCosto ] = useState<number | string>('')
    const [ withCertification, setWithCertification ] = useState<number | string>('')

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

    const filteredCourses = cursos.filter(curso => {
      return(
          filterByType(curso, type) &&
          filterByAuthor(curso, author) &&
          filterByLanguage(curso, selectedLanguage) &&
          filterByFree(curso, costo) &&
          filterByTechnology(curso, technology) &&
          filterByCertification(curso, withCertification)
      )
    })

    return (
        <section className={ styles.section }>
            <div className={ styles['filters-ctn'] }>
                <div className={ styles['btn-ctn'] }>
                    {
                      types.map((tipo) => (
                        <button
                          onClick={ () => setType(tipo.type_name) }
                          className={ (tipo.type_name === type) ? styles['is-active'] : '' } 
                          key={ tipo.type_id }>{ tipo.type_name }
                        </button>
                      ))
                    }
                </div>
                <div className={ styles['info-filters-ctn'] }>
                    <select value={ withCertification } onChange={(e) => setWithCertification(e.target.value)}>
                        <option value={ "" }>Certificacion</option>
                        <option value={ 1 }>Con Certificado</option>
                        <option value={ 0 }>Sin Certificado</option>
                      </select>
                    <select
                        value={ selectedLanguage }
                        onChange={ (e) => setSelectedLanguage(e.target.value)} >
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
            
                    <select value={ costo } onChange={(e) => setCosto(e.target.value)}>
                      <option value={ "" }>Costo</option>
                      <option value={ 1 }>Gratis</option>
                      <option value={ 0 }>Pago</option>
                    </select>

                    <select 
                        value={ author }
                        onChange={ (e) => setAuthor(e.target.value)} >
                        <option value="">Autor</option>
                        {
                          authors.map((autor) => (
                            <option 
                              key={ autor.author_id } 
                              value={ autor.author_name } 
                            >{ autor.author_name }
                            </option>
                          ))
                        }
                    </select>
                </div>
            </div>
            <div className={ styles['card-section'] }>
                {
                  isLoading 
                      ? <p>Cargando...</p>
                      : filteredCourses.map(({ course_id, title, technology, image, author, is_free, with_certification }) => (
                          <Card  
                            id={ course_id }
                            key={ course_id }
                            title={ title }
                            image={ image }
                            technology={ technology }
                            author={ author }
                            is_free={ is_free }
                            with_certification={ with_certification }
                          />
                        ))
                }
            </div>
            {
              (filteredCourses.length <= 0)
                && <NoCoursesComponent />
            }
        </section>
    )
}


export default CoursesSection