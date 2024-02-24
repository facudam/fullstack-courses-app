import { FC, useContext, useState } from "react";
import styles from './Author.module.css'
import axios from "axios";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";
import { CoursesContext } from "../../context/CoursesContext";

const AuthorForm: FC = () => {

    interface AuthorState {
        author_name: '',
        author_country: ''
    }

    interface ErrorState {
        error_name: string, 
        error_country: string
    }

    const { setToggleAuthorState, toggleAuthorState } = useContext(CoursesContext)

    const [ authorData, setAuthorData ] = useState<AuthorState>({
        author_name: '',
        author_country: ''
    })

    const [ error, setError ] = useState<ErrorState>({
        error_name: '',
        error_country: ''
    })

    
    const validateData = () => {
        const hasErrors =
            authorData.author_name.trim() === '' ||
            authorData.author_country.trim() === '';
    
        return !hasErrors;
    };
   

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const isValid = validateData()
        if (!isValid) {
            setError({
                error_name: authorData.author_name.trim() === ''
                    ? 'Por favor, ingresa el nombre del nuevo autor'
                    : '',
                error_country: authorData.author_country.trim() === ''
                    ? 'Por favor, ingresa el país de origen del nuevo autor'
                    : '',
            });
            return;
        }

        setError({ error_country: '', error_name: '' })
        setAuthorData({ author_name: '', author_country: '' })

        try {
            const response = await axios.post(`${apiBaseUrl}/api/authors`, {'author_name': authorData.author_name, 'author_country': authorData.author_country }, {
                headers: {
                    'Content-Type': 'application/json'
                    }
            });
            alert('¡Se ha añadido un nuevo autor exitosamente!')
            console.log(response.data)
            setToggleAuthorState(!toggleAuthorState) // Para renderizar nuevamente la lista de autores una vez añadido un nuevo autor (toggleAuthorState es una dependencia en useAuthor)
        } catch (error) {
            alert(`error: ${ error }`)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuthorData({ ...authorData, [name]: value });
    };

    return(
        <div className={ styles.form }>
            <div className={ styles.spaceBetween }>
                <label>Nombre:</label>
                <span>{ authorData.author_name.length }/30</span>
            </div>
            {
                (error.error_name.trim() !== '') &&
                    <span>{ error.error_name }</span>
            }
            <input 
                onChange={ handleChange }
                type="text" 
                name="author_name" 
                value={ authorData.author_name }
                maxLength={ 30 }
            />

            <div className={ styles.spaceBetween }>
                <label>País:</label>
                <span>{ authorData.author_country.length }/30</span>
            </div>
            
            {
                (error.error_country.trim() !== '') &&
                    <span>{ error.error_country }</span>
            }
            <input
                onChange={ handleChange }
                type="text" 
                name="author_country" 
                value={ authorData.author_country }
                maxLength={ 30 } 
            />
            <button onClick={(e) => handleSubmit(e)}>Añadir nuevo autor</button>
        </div>
    )
}

export default AuthorForm;