import { FC, useContext } from "react";
import styles from './EmptyStarImg.module.css'
import { CoursesContext } from "../../context/CoursesContext";

interface Props {
    color?: string,
    value: number
}

const EmptyStarImg: FC<Props> = ({ color, value }) => {

  const { setStarsAssigned } = useContext(CoursesContext)

  return(
    <>
      <svg onClick={() => setStarsAssigned(value + 1)} className={ styles.star } width={26} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.9 117.1"><path d="m64.4 2 15.7 36.7 39.9 3.6a3.2 3.2 0 0 1 1.8 5.6L91.6 74.2l9 39A3.2 3.2 0 0 1 98 117a3.3 3.3 0 0 1-2.4-.5L61.4 96.1l-34.3 20.5a3.2 3.2 0 0 1-4.4-1 3.1 3.1 0 0 1-.4-2.4l9-39L1 47.9a3.2 3.2 0 0 1-.3-4.5 3.3 3.3 0 0 1 2.3-1l39.7-3.6L58.5 2a3.2 3.2 0 0 1 6 0Z" fill={ color } /></svg>
    </>
    
  )
}

export default EmptyStarImg;
