import { FC, useContext, useState } from "react";
import styles from './TechForm.module.css'
import axios from "axios";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";
import { CoursesContext } from "../../context/CoursesContext";

const TechForm: FC = () => {

    const { toggleTechState, setToggleTechState } = useContext(CoursesContext)
    const [ technology, setTechnology ] = useState<string>('')
    const [ error, setError ] = useState<string>('')

    const validateForm = () => {
        const hasError = technology.trim() === ''
        return !hasError
    }

    const handleNewTechnology = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()

        const isValid = validateForm()

        if (!isValid) {
            setError('Por favor, ingrese el nombre de la nueva tecnología')
            return
        }

        setError('')
        setTechnology('')

        try {
            const response = await axios.post(`${apiBaseUrl}/api/technologies`, { tech_name: technology }, {
                headers: {
                'Content-Type': 'application/json'
                }
            });

            console.log(response.data)
            setToggleTechState(!toggleTechState) // Para renderizar nuevamente la lista de tecnologías una vez añadido una nueva a la BD (toggleTechState es una dependencia en useTechnology)
            alert('¡La tecnología se ha añadido correctamente!')

        } catch (error) {
            alert(`Error: ${error}`)
        }
    }

    return (
        <div className={ styles['tech-send'] }>
            <div className={ styles.spaceBetween }>
               <label>Nombre</label>
               <span>{ technology.length }/25</span> 
            </div>
            { (error.length !== 0 && technology.length === 0) && <span className={ styles['mini-text'] }>{ error }</span> }
            <input 
                type='text' 
                value={ technology } 
                onChange={ (e) => setTechnology(e.target.value) }
                maxLength={ 25 }
                placeholder="Ingresa la nueva tecnología"
            />
            <button onClick={(event) => handleNewTechnology(event)}>Añadir tecnología</button>
        </div>
    )

}

export default TechForm;