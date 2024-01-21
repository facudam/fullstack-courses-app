import { FC, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './CourseModal.module.css'
import { CoursesContext } from '../../context/CoursesContext'
import getAuthorById from '../../services/api/endpoints/author/getAuthorById'
import getCourseById from '../../services/api/endpoints/courses/getCourseById'


const CourseModal: FC = () => {

    const {
        setCourseModalIsOpen,
        openCourseId,
        authorId,
        setAuthorId,
        authorInfo,
        setAuthorInfo,
        courseInfo,
        setCourseInfo,
    } = useContext(CoursesContext);

          useEffect(() => {
            async function fetchData() {
              try {
                const curso = await getCourseById(openCourseId);
                setAuthorId(curso.author_id);
                setCourseInfo(curso);
        
                // Fetch author information only after course information is fetched
                if (authorId) {
                  const author = await getAuthorById(authorId);
                  setAuthorInfo(author);
                }
              } catch (error) {
                throw new Error(`Lo sentimos, ha habido un error: ${error}`);
              }
            }
        
            fetchData();
          }, [ authorId ])

    return ReactDOM.createPortal(
        <>
            <div className={ styles['full-screen'] }></div>
            <div className={ styles.modal }>
                <main className={ styles.main }>
                    <button 
                        onClick={ () => setCourseModalIsOpen(false) }
                        className={ styles.btn }>
                        x
                    </button>
                    <div className={ styles['img-ctn'] }>
                        <img src={ courseInfo?.image } />
                    </div>
                    <div className={ styles['info-ctn'] }>
                        <h2>{ courseInfo?.title }</h2>
                        <p>{ courseInfo?.description }</p>
                        
                        <a href={ courseInfo?.resource_link } target='_blank' rel='noopener noreferrer nofollow'>Acceder al curso</a>
                        <div className={ styles.types }>
                            <span>{ (courseInfo?.is_free === 1) ? 'Gratis' : 'Pago' }</span>
                            <span>{ courseInfo?.technology }</span>
                            <span>{ courseInfo?.type }</span>
                            <span>{ courseInfo?.language }</span>
                        </div>
                        <p>
                            <strong>Author:</strong> <span>{ authorInfo?.author_name } - { authorInfo?.author_country }</span>
                        </p>
                    </div>
                </main>
                <div className={ styles.comments }>
                    <h3>Comentarios:</h3>
                    
                    <p>Juan: This course is very helpful. I learned a lot about React and Redux.</p>
                    <p>Mariano: This course is very helpful. I learned a lot about React and Redux.</p>
                    <p>Alan: This course is very helpful. I learned a lot about React and Redux.</p>
                    <p>Isabel: This course is very helpful. I learned a lot about React and Redux.</p>
                    <p>Jorge: This course is very helpful. I learned a lot about React and Redux.</p>
                    <p>Romina: This course is very helpful. I learned a lot about React and Redux.</p>
                </div>
            </div>
        </>,
        document.getElementById('portal') || document.createElement('div')
    )
}

export default CourseModal;