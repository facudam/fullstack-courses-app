import { useContext, useEffect, useState } from "react";
import getTechnologies from "../services/api/endpoints/technologies/getTechnologies";
import { Technology } from "../interfaces/models";
import { CoursesContext } from "../context/CoursesContext";


const useTechnology = () => {

    const { toggleTechState } = useContext(CoursesContext)
    const [ technologies, setTechnologies ] = useState<Technology[]>()

    useEffect(() => {
        const fetchTecnologies = async() => {
            try {
                const tecnologias = await getTechnologies()
                setTechnologies(tecnologias)
            } catch (error) {
                throw new Error(`Lo sentimos, ha habido un error al intentar obtener lista de tecnologías: ${error}`)
            }
        }
        fetchTecnologies()
    }, [ toggleTechState ])

    return { technologies }
}

export default useTechnology;