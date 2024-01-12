import { FC } from "react"
import styles from '../header/Header.module.css'
import { lupa, rocket } from "../../images/images"


export const Header: FC = () => {
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
                <input type='text' placeholder="Escribe la tecnología" />
            </div>
        </header>
    )
}