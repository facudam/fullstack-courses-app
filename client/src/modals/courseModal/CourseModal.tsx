import { FC, useContext, useEffect, useState } from 'react'
import styles from './CourseModal.module.css'
import { CoursesContext } from '../../context/CoursesContext'
import getAuthorById from '../../services/api/endpoints/author/getAuthorById'
import getCourseById from '../../services/api/endpoints/courses/getCourseById'
import getCommentsByCourseId from '../../services/api/endpoints/comments/getCommentsByCourseId'
import addNewComment from '../../services/api/endpoints/comments/addNewComment'
import { AxiosResponse } from 'axios'
import { CommentResponse, Comment } from '../../interfaces/models'
import ModalLayout from '../modalLayout/ModalLayout'
import UserComment from '../../components/comment/Comment'


const CourseModal: FC = () => {
    const {
        setIsCourseModalOpen,
        openCourseId,
        authorId,
        setAuthorId,
        authorInfo,
        setAuthorInfo,
        courseInfo,
        setCourseInfo,
        isAuthenticated,
        userId,
        userName
    } = useContext(CoursesContext);

    const [ comments, setComments ] = useState<Comment[]>([])
    const [ newComment, setNewComment ] = useState<string>('')
    const [ showMore, setShowMore ] = useState(false);

    const closeModal = () => {
        setNewComment('')
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
            .catch((error) => {
            console.error('Error al agregar comentario:', error);
            });
    }
    
    useEffect(() => {
        async function fetchData() {
            try {
                const curso = await getCourseById(openCourseId);
                setAuthorId(curso.author_id);
                setCourseInfo(curso);

                if (authorId) {
                    const author = await getAuthorById(authorId);
                    setAuthorInfo(author);
                }

                if (curso) {
                    const courseComments = await getCommentsByCourseId(curso.course_id)
                    setComments(courseComments)
                }
            } catch (error) {
                throw new Error(`Lo sentimos, ha habido un error: ${error}`);
            }
        }

        fetchData();
    }, [ authorId, openCourseId, setAuthorId, setAuthorInfo, setCourseInfo ])

    return (
        <ModalLayout closeFn={ closeModal }>
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
                        <strong>Author:</strong> <span>{ authorInfo?.author_name } - { authorInfo?.author_country }</span>
                    </p>
                </div>
            </main>
            <div className={ styles.comments }>
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
                    isAuthenticated && 
                        <>
                            <h3>¿Ya completaste el curso? Comparte tu experiencia con la comunidad</h3>
                            <input type='text' value={ newComment } onChange={(e) => setNewComment(e.target.value)} />
                            <button onClick={ handleNewComment }>Enviar feedback</button>
                        </>   
                }
            </div>
        </ModalLayout> 
    )
}

export default CourseModal;