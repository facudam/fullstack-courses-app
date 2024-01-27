import { FC, useContext } from "react"
import styles from '../header/Header.module.css'
import { lupa, rocket } from "../../assets/images/images"
import { CoursesContext } from '../../context/CoursesContext';


export const Header: FC = () => {

    const { technology ,setTechnology } = useContext(CoursesContext)

    return(
        <header className={ styles.header }>
            <div className={ styles['header-ctn'] }>
                <div className={ styles['header-ctn__titles'] }>
                    <h1> <span>Tu formación al alcance de tu mano</span></h1>
                    <div className={ styles.paragraph_ctn }>
                        <p>La biblioteca online con los mejores cursos de tecnología para Back-End, Front-End, Testing, Diseño UX/UI y más.</p>
                        <p>Encuentra los cursos que necesitas para desarrollar tus habilidades IT, sin importar tu nivel de experiencia.</p>
                    </div>
                </div>
                <div className={ styles['header-ctn__image'] }>
                    <img src={ rocket } alt="rocket"/>
                </div>
            </div>
            <div className={ styles['input-ctn'] }>
                <img src={ lupa } alt="magnifying glass | lupa" width={15}/>
                <input
                    onChange={ (e) => setTechnology(e.target.value) } 
                    type='text' 
                    placeholder="Escribe la tecnología" 
                    value={ technology }
                />
            </div>
        </header>
    )
}