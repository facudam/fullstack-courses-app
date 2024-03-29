import { useEffect, useState } from "react"
import { Language } from "../interfaces/models"
import getLanguages from "../services/api/endpoints/languages/getLanguages"

const useLanguage = () => {
    const [ language, setLaguage ] = useState<Language[]>([])

    useEffect(() => {
        const fetchLanguages = async() => {
            try {
                const idiomas = await getLanguages()
                setLaguage(idiomas)
            } catch (error) {
                throw new Error(`Lo sentimos, ha habido un error al intentar obtener lista de lenguajes: ${error}`)
            }
        }
        fetchLanguages()
    }, [])

    return { language }
}

export default useLanguage;