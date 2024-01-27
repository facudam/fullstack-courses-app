import { useEffect, useState } from "react"
import { Author } from "../interfaces/models"
import getAuthors from "../services/api/endpoints/author/getAuthors";

const useAuthor = () => {
    const [ authors, setAuthors ] = useState<Author[]>([]);

    useEffect(() => {
        const fetchAuthors = async() => {
            try {
                const autores = await getAuthors()
                setAuthors(autores)
            } catch (error) {
                throw new Error(`Lo sentimos, ha habido un error: ${ error }`)
            }
        }

        fetchAuthors()
    }, [])

    return { authors }
}

export default useAuthor