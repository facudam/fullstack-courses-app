import { FC, useContext, useEffect, useState } from 'react'
import styles from './CoursesSection.module.css'
import getCourses from '../../services/api/endpoints/courses/getCourses';
import { Curso } from '../../interfaces/models';
import Card from '../../components/card/Card';
import { useAuthor, useLanguage } from '../../hooks';
import { filterByAuthor, filterByFree, filterByLanguage, filterByType, filterByCertification, filteringCoursesByTech } from '../../helpers/filters';
import { CoursesContext } from '../../context/CoursesContext';
import NoCoursesComponent from '../../components/noCoursesComponent/NoCourses';
import { filter, leftArrow } from '../../assets/images/images';

const CoursesSection: FC = () => {

    const { technology, alertNewCourseWasAdded } = useContext(CoursesContext)

    const [ cursos, setCursos ] = useState<Curso[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ selectedLanguage, setSelectedLanguage ] = useState<string>('')
    const [ type, setType ] = useState<string>('Front-End')
    const [ author, setAuthor ] = useState<string>('')
    const [ costo, setCosto ] = useState<number | string>('')
    const [ withCertification, setWithCertification ] = useState<number | string>('')
    const [ areTypesButtonsDisabled, setAreTypesButtonsDisabled] = useState<boolean>(false)

    const types = [ {type_id: 1, type_name: 'Front-End'}, {type_id: 2, type_name: 'Back-End'}, {type_id: 3, type_name: 'Diseño UX-UI'}, {type_id: 4, type_name: 'Testing'}, {type_id: 5, type_name: 'Dev-Tools'} ]
    const { language } = useLanguage()
    const { authors } = useAuthor()

    const toggleFilterMenu = () => {
      const menu = document.querySelector(`.${styles['filters-ctn']}`)
        menu?.classList.toggle(`${styles['active']}`)
    }

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
      }, [ alertNewCourseWasAdded ]);

    useEffect(() => {
      if(technology.trim().length > 0 || isLoading) {
        setAreTypesButtonsDisabled(true)
      } else {
        setAreTypesButtonsDisabled(false)
      }
    }, [ technology, isLoading ])

    useEffect(() => {
      const typeButtons = document.querySelectorAll(`.${styles['btn-ctn']} button`);
      typeButtons.forEach(button => {
        if (button instanceof HTMLElement) {
          if (technology.length > 0 && areTypesButtonsDisabled) {
          button.style.pointerEvents = 'none';
          button.style.opacity = '.2'
        } else {
          button.style.pointerEvents = 'auto';
          button.style.opacity = "1"
        }
        }
      });
    }, [technology, areTypesButtonsDisabled]);

    const coursesList: Curso[] = filteringCoursesByTech(cursos, technology)

    const filteredCourses = coursesList.filter(curso => {
      if (technology.trim().length <= 0) {
        return(
          filterByType(curso, type) &&
          filterByAuthor(curso, author) &&
          filterByLanguage(curso, selectedLanguage) &&
          filterByFree(curso, costo) &&
          filterByCertification(curso, withCertification)
        )} 
      return(
        filterByAuthor(curso, author) &&
        filterByLanguage(curso, selectedLanguage) &&
        filterByFree(curso, costo) &&
        filterByCertification(curso, withCertification)
      )
    })

    const setCourseTypeIfAppropriate = (tipo: string) => {
      if (!areTypesButtonsDisabled) setType(tipo);
      return;
    }

    return (
        <section className={ styles.section }>
          <button
            onClick={ toggleFilterMenu } 
            className={ styles['filter-btn'] }
          >
            <img src={ filter } />
            <span>Filtrar</span>
          </button>
          <div className={ styles['filters-ctn'] }>
              <button
                onClick={ toggleFilterMenu }
                className={ styles['filters-ctn_btn'] }
              >
                <img src={ leftArrow } width={20} alt='left arrow' />
              </button>
              <div className={ styles['btn-ctn'] }>
                  {
                    types.map((tipo) => (
                      <button
                        onClick={ () => setCourseTypeIfAppropriate(tipo.type_name) }
                        className={ (tipo.type_name === type && !areTypesButtonsDisabled) ? styles['is-active'] : '' } 
                        key={ tipo.type_id }
                        >{ tipo.type_name }
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