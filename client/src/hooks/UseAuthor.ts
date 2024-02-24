import { useContext, useEffect, useState } from "react"
import { Author } from "../interfaces/models"
import getAuthors from "../services/api/endpoints/author/getAuthors";
import { CoursesContext } from "../context/CoursesContext";

const useAuthor = () => {
    const { toggleAuthorState } = useContext(CoursesContext) //Para volver a renderizar cuando se cree un nuevo autor.
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
    }, [ toggleAuthorState ])

    return { authors }
}

export default useAuthor