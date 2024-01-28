import { useEffect, useState } from "react";
import getTechnologies from "../services/api/endpoints/technologies/getTechnologies";
import { Technology } from "../interfaces/models";


const useTechnology = () => {
    const [ technologies, setTechnologies ] = useState<Technology[]>()

    useEffect(() => {
        const fetchTecnologies = async() => {
            try {
                const tecnologias = await getTechnologies()
                setTechnologies(tecnologias)
            } catch (error) {
                throw new Error(`Lo sentimos, ha habido un error al intentar procesar la solicitud: ${error}`)
            }
        }
        fetchTecnologies()
    }, [])

    return { technologies }
}

export default useTechnology;