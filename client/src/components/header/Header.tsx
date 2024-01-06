import { FC } from "react"
import lupa from '../../images/lupa.svg'

export const Header: FC = () => {
    return(
        <header>
            <h1>IT Courses: Tu formación al alcance de tu mano.</h1>
            <div>
                <p>La biblioteca online con los mejores cursos de tecnología para backend, frontend, testing, diseño UX/UI y más.</p>
                <p>Encuentra los cursos que necesitas para desarrollar tus habilidades IT, sin importar tu nivel de experiencia.</p>
            </div>
            <div>
                <img src={ lupa } alt="magnifying glass | lupa" width={15}/>
                <input type='text' placeholder="Escribe la tecnología" />
            </div>
            
        </header>
    )
}