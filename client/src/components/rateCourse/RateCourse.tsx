import { FC, useContext } from "react"
import EmptyStarImg from "../../components/emptyStarImg/EmptyStarImg"
import styles from './RateCourse.module.css'
import { CoursesContext } from "../../context/CoursesContext"
import { addNewRate } from "../../services/api/endpoints/rates/addNewRate"
import { AxiosError, AxiosResponse } from "axios"

interface Props {
    id?: number,
    user_id?: number,
    course_id?: number
}
const RateCourse: FC<Props> = ({ user_id, course_id }) => {

  const { starsAssigned } = useContext(CoursesContext)

  
  const handleRate = async() => {
    if (starsAssigned < 1) return;
    addNewRate(starsAssigned, course_id, user_id)
      .then((response: AxiosResponse) => {
        console.log(response.data)
        alert('¡Calificación agregada correctamente!');
      })
      .catch((error: AxiosError) => {
        if (error.response?.status == 409) {
          alert('Ya has calificado este curso previamente y sólo se permite una calificación a un mismo curso por usuario')
        } else {
          alert('Lo sentimos, ha habido un error al intentar procesar la puntuación')
        }
      })
  }

  return (
    <div className={ styles['main-ctn'] }>
        <div className={ styles['stars-ctn'] }>
          {
            [...Array(5)].map((_, index) => (
              <EmptyStarImg 
                color={(index < starsAssigned) ? 'gold' : '#fff' } 
                key={ index }
                value={ index }
              />
            ))
          }
        </div>
        <button onClick={ handleRate }>Enviar</button>
    </div>
  )
}

export default RateCourse