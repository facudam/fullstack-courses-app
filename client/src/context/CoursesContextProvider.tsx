
import { Author, Curso } from "../interfaces/models"
import { CoursesContext } from "./CoursesContext"
import { ReactNode, useState, FC } from "react"

interface ContextProviderProps {
    children?: ReactNode
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>()
    const [ userName, setUserName ] = useState<string>('')
    const [ isCourseModalOpen, setIsCourseModalOpen ] = useState<boolean>(false)
    const [ openCourseId, setOpenCourseId ] = useState<number | undefined | null>()
    const [ courseInfo, setCourseInfo ] = useState<Curso>()
    const [ authorId, setAuthorId ] = useState<number>()
    const [ authorInfo, setAuthorInfo ] = useState<Author>()
    const [ technology, setTechnology ] = useState<string>('')
    const [ userId, setUserId ] = useState<number | undefined>()

    return(
        <CoursesContext.Provider 
            value={
                {
                    isAuthenticated, setIsAuthenticated,
                    userName, setUserName,
                    isCourseModalOpen, setIsCourseModalOpen,
                    openCourseId, setOpenCourseId,
                    courseInfo, setCourseInfo,
                    authorId, setAuthorId,
                    authorInfo, setAuthorInfo,
                    technology, setTechnology,
                    userId, setUserId
                }   
            }
        >
            { children }
        </CoursesContext.Provider>
    )
}