import { FC, useState } from "react";
import styles from './Author.module.css'
import axios from "axios";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";

const AuthorForm: FC = () => {

    interface AuthorData {
        author_name: string,
        author_country: string
    }

    const [ authorData, setAuthorData ] = useState<AuthorData>({
        author_name: '',
        author_country: ''
    })

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            const response = await axios.post(`${apiBaseUrl}/api/authors`, {'author_name': authorData.author_name, 'author_country': authorData.author_country }, {
                headers: {
                    'Content-Type': 'application/json'
                    }
            });
            alert('¡Se ha añadido un nuevo autor exitosamente!')
            console.log(response.data)
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
            <label>Nombre:</label>
            <input 
                onChange={ handleChange }
                type="text" 
                name="author_name" 
                value={ authorData.author_name } 
            />

            <label>País:</label>
            <input
                onChange={ handleChange }
                type="text" 
                name="author_country" 
                value={ authorData.author_country } 
            />
            <button onClick={(e) => handleSubmit(e)}>Añadir nuevo autor</button>
        </div>
    )
}

export default AuthorForm;