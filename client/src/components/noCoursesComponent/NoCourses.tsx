import { FC } from "react"
import styles from './NoCourses.module.css'
import { nodata } from "../../assets/images/images"

const NoCoursesComponent: FC = () => {
    return (
        <div className={ styles.message_ctn }>
            <img src={ nodata } />
        </div>
    )
}

export default NoCoursesComponent