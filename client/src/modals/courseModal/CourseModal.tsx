import { FC, useContext, useEffect, useState } from 'react'
import styles from './CourseModal.module.css'
import { CoursesContext } from '../../context/CoursesContext'
import getCourseById from '../../services/api/endpoints/courses/getCourseById'
import getCommentsByCourseId from '../../services/api/endpoints/comments/getCommentsByCourseId'
import addNewComment from '../../services/api/endpoints/comments/addNewComment'
import { AxiosError, AxiosResponse } from 'axios'
import { CommentResponse, Comment } from '../../interfaces/models'
import ModalLayout from '../modalLayout/ModalLayout.tsx'
import UserComment from '../../components/commentComponent/Comment'
import CommentInput from '../../components/commentInput/CommentInput'
import CourseModalLoading from '../loadingsSkeletons/courseModalLoading/CourseModalLoading.tsx'
import { Link } from 'react-router-dom'
import StarRating from '../../components/starRating/StarRating.tsx'
import RateCourse from '../../components/rateCourse/RateCourse.tsx'

const CourseModal: FC = () => {
    const {
        setIsCourseModalOpen,
        openCourseId,
        courseInfo,
        setCourseInfo,
        isAuthenticated,
        userId,
        userName,
        setStarsAssigned
    } = useContext(CoursesContext);

    const [ comments, setComments ] = useState<Comment[]>([])
    const [ newComment, setNewComment ] = useState<string>('')
    const [ showMore, setShowMore ] = useState(false);
    const [ isInfoCourseLoading, setIsInfoCourseLoading ] = useState<boolean>(true)

    const closeModal = () => {
        setNewComment('')
        setStarsAssigned(0)
        setIsCourseModalOpen(false)
    };

    const comentario: CommentResponse = {
        comment_description: newComment,
        course_id: courseInfo?.course_id,
        user_id: userId
    }

    const handleNewComment = () => {
        addNewComment(comentario)
            .then((respuesta: AxiosResponse) => {
                setComments((prevComments) => [...prevComments, respuesta.data])
                setNewComment('')
            })
            .catch((error: AxiosError) => {
            console.error('Error al agregar comentario:', error);
            });
    }
    
    useEffect(() => {
        async function fetchData() {
            try {
                const curso = await getCourseById(openCourseId);
                setCourseInfo(curso);
                if (curso) {
                    const courseComments = await getCommentsByCourseId(curso.course_id)
                    setComments(courseComments)
                }
                setIsInfoCourseLoading(false)  
            } catch (error) {
                throw new Error(`Lo sentimos, ha habido un error: ${error}`);
            }
        }
        fetchData();
    }, [ openCourseId, setCourseInfo ])

    return (
        <ModalLayout closeFn={ closeModal }>
            {
                isInfoCourseLoading
                    ? <CourseModalLoading />
                    : 
                    <>
                        <main className={ styles.main }>
                            <button 
                                onClick={ closeModal }
                                className={ styles.btn }>
                                x
                            </button>
                            <div className={ styles['img-ctn'] }>
                                <img src={ courseInfo?.image } />
                            </div>
                            <div className={ styles['info-ctn'] }>
                                <h2>{courseInfo?.title}</h2>
                                <p className={showMore ? '' : styles['truncate']}>
                                    {courseInfo?.description}
                                </p>
                                {
                                    (typeof courseInfo?.description === 'string' && courseInfo.description.length > 90) &&
                                    <button className={ styles.showBtn } onClick={() => setShowMore(!showMore)}>
                                        {
                                            showMore
                                                ? '... leer menos'
                                                : '... leer más'
                                        }
                                    </button>
                                }
                                {
                                    (courseInfo?.rating !== null && courseInfo?.rating !== undefined) &&
                                        <StarRating rating={courseInfo?.rating} rates_quantity={courseInfo.rates_quantity} />
                                }
                                
                                <a href={ courseInfo?.resource_link } target='_blank' rel='noopener noreferrer nofollow'>Acceder al curso</a>
                                <div className={ styles.types }>
                                    <span className={ styles['light-blue'] }>{ (courseInfo?.is_free === 1) ? 'Gratis' : 'Pago' }</span>
                                    <span className={ styles.blue }>{ courseInfo?.technology }</span>
                                    <span className={ styles.green }>{ courseInfo?.type }</span>
                                    <span className={ styles.pink }>{ courseInfo?.language }</span>
                                    {
                                        (courseInfo?.with_certification == '1') &&
                                            <span className={ styles.yellow }>Certificado de finalización</span>
                                    }
                                </div>
                                <p className={ styles.author }>
                                    <strong>Author:</strong> <span>{ courseInfo?.author } - { courseInfo?.author_country }</span>
                                </p>
                            </div>
                        </main>
                        <div className={ styles.comments }>
                            <button>Califica este curso</button>
                            {
                                isAuthenticated &&
                                  <RateCourse 
                                    course_id={ courseInfo?.course_id } 
                                    user_id={ userId } 
                                   />  
                            }
                            
                            <h3>Feedback sobre el curso:</h3>
                            {
                                (comments && comments?.length > 0)
                                    ? comments.map((comment, index) => (
                                        <UserComment key={(comment.comment_id) ? comment.comment_id : index} 
                                            userName={(comment.user) ? comment.user : userName }
                                            comment={ comment.comment_description }
                                        />
                                    ))
                                    : <p>Aún no se ha dejado ningún feedback sobre este curso</p>
                            }
                            {
                                isAuthenticated 
                                    ? 
                                        <CommentInput 
                                            newComment={ newComment }
                                            handleChange={(e) => setNewComment(e.target.value)}
                                            handleNewComment={ handleNewComment }
                                            placeholder='Escribe aquí tu feedback'
                                            textButton='Enviar feedback'
                                        />
                                    :
                                        <h3>¿Quiéres compartir tu experiencia sobre este curso? <Link to='/iniciar-sesion'>Inicia sesión</Link>  y compártela con la comunidad.</h3>  
                            }
                        </div>
                    </>
            }
            
        </ModalLayout> 
    )
}

export default CourseModal;