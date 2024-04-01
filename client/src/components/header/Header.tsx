import { FC, useContext, useState, useEffect } from "react"
import styles from '../header/Header.module.css'
import { lupa } from "../../assets/images/images"
import { CoursesContext } from '../../context/CoursesContext';

export const Header: FC = () => {

    const { setTechnology } = useContext(CoursesContext)
    const [ inputValue, setInputValue ] = useState<string>('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setTechnology(inputValue);
        }, 500);

        return () => clearTimeout(timer);
    }, [inputValue, setTechnology]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    return(
        <header className={ styles.header }>
            <div className={ styles['header-ctn'] }>
                <div className={ styles['header-ctn__titles'] }>
                    <ul className={ styles.keywords }>
                        <li>Explora</li>
                        <li>Descubre</li>
                        <li>Contribuye</li>
                    </ul>
                    <h1>Tu formación al alcance de tu mano</h1>
                    <p>La biblioteca online con los mejores cursos de tecnología para Back-End, Front-End, Testing, Diseño UX/UI y más. Encuentra los cursos que necesitas para desarrollar tus habilidades IT, sin importar tu nivel de experiencia.</p>
                </div>
            </div>
            <div className={ styles['input-ctn'] }>
                <img src={ lupa } alt="magnifying glass | lupa" width={15}/>
                <input
                    onChange={ (e) => handleInput(e) } 
                    type='text' 
                    placeholder="Buscar tecnología" 
                    value={ inputValue }
                />
            </div>
        </header>
    )
}