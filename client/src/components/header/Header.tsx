import { FC, useContext } from "react"
import styles from '../header/Header.module.css'
import { lupa } from "../../assets/images/images"
import { CoursesContext } from '../../context/CoursesContext';


export const Header: FC = () => {

    const { technology ,setTechnology } = useContext(CoursesContext)

    return(
        <header className={ styles.header }>
            <div className={ styles['header-ctn'] }>
                <div className={ styles['header-ctn__titles'] }>
                    <h1>Tu formación al alcance de tu mano</h1>
                    <p>La biblioteca online con los mejores cursos de tecnología para Back-End, Front-End, Testing, Diseño UX/UI y más. Encuentra los cursos que necesitas para desarrollar tus habilidades IT, sin importar tu nivel de experiencia.</p>
                </div>
            </div>
            <div className={ styles['input-ctn'] }>
                <img src={ lupa } alt="magnifying glass | lupa" width={15}/>
                <input
                    onChange={ (e) => setTechnology(e.target.value) } 
                    type='text' 
                    placeholder="Buscar tecnología" 
                    value={ technology }
                />
            </div>
        </header>
    )
}