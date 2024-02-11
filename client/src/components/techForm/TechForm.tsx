import { FC, useContext, useState } from "react";
import styles from './TechForm.module.css'
import axios from "axios";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";
import { CoursesContext } from "../../context/CoursesContext";

const TechForm: FC = () => {

    const { toggleTechState, setToggleTechState } = useContext(CoursesContext)
    const [ technology, setTechnology ] = useState<string>('')

    const handleNewTechnology = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        try {
            const response = await axios.post(`${apiBaseUrl}/api/technologies`, { tech_name: technology }, {
                headers: {
                'Content-Type': 'application/json'
                }
            });

            console.log(response.data)
            setToggleTechState(!toggleTechState) // Para renderizar nuevamente la lista de tecnologías una vez añadido una nueva a la BD (toggleTechState es una dependencia en useTechnology)
            alert('technologia agregada!')

        } catch (error) {
            alert(`Error: ${error}`)
        }
    }

    return (
        <div
            className={ styles['tech-send'] }
        >
            <label>Nombre</label>
            <input type='text' value={ technology } onChange={ (e) => setTechnology(e.target.value) } />
            <button onClick={(event) => handleNewTechnology(event)}>Añadir tecnología</button>
        </div>
    )

}

export default TechForm;