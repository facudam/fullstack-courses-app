import { FC, useContext } from "react";
import { CardProps } from "../../interfaces/models";
import styles from './Card.module.css'
import { CoursesContext } from "../../context/CoursesContext";
import { graduado } from "../../assets/images/images";


const Card: FC<CardProps> = ({ id,  title, author, image, is_free, technology, with_certification }) => {

    const { setIsCourseModalOpen, setOpenCourseId } = useContext(CoursesContext)

    const openCourse = (id: number | undefined) => {
        setOpenCourseId(id)
        setIsCourseModalOpen(true)
    }

    return (
        <div
            onClick={() => openCourse(id) } 
            className={ styles.card }>
            <div className={ styles['image-ctn'] }>
                <img src={ image } alt=""/>
            </div>
            <h3>{ title }</h3>
            <div className={ styles['full-data-card'] }>
                <div className={ styles['info-card'] }>
                    <span>{ technology }</span>
                    <span>{ (is_free === 0) ? 'Pago' : 'Gratis' }</span>
                </div>
                <p><span>Por </span>{ author }</p> 
            </div>
            {
                (with_certification === 1) &&
                    <div className={ styles.graduado }>
                        <img src={ graduado } />
                    </div> 
            }
            
        </div>
    )
}

export default Card