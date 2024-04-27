import { FC, useContext } from "react"
import EmptyStarImg from "../../components/emptyStarImg/EmptyStarImg"
import styles from './RateCourse.module.css'
import { CoursesContext } from "../../context/CoursesContext"
import { addNewRate } from "../../services/api/endpoints/rates/addNewRate"


interface Props {
    id?: number,
    user_id?: number,
    course_id?: number
}
const RateCourse: FC<Props> = ({ user_id, course_id }) => {

  const { starsAssigned, setStarsAssigned } = useContext(CoursesContext)

  
  const handleRate = async() => {
    if (starsAssigned < 1) return;
    try {
      const response = await addNewRate(starsAssigned, course_id, user_id);
      console.log(response.data)
      setStarsAssigned(0)
      alert('¡Calificación agregada correctamente!');
    } catch (error) {
      console.error('Error al agregar la calificación:', error);
    }
  }

  return (
    <div className={ styles['main-ctn'] }>
        <div className={ styles['stars-ctn'] }>
          {
            [...Array(5)].map((_, index) => (
              <EmptyStarImg 
                color={(index < starsAssigned) ? 'gold' : '#eceff1' } 
                key={ index }
                value={ index }
              />
            ))
          }
        </div>
        <button onClick={ handleRate }>Calificar</button>
    </div>
  )
}

export default RateCourse