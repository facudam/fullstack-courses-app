
import { Author, Curso } from "../interfaces/models"
import { CoursesContext } from "./CoursesContext"
import { ReactNode, useState, FC } from "react"

interface ContextProviderProps {
    children?: ReactNode
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean | undefined>()
    const [ userName, setUserName ] = useState<string>('')
    const [ isCourseModalOpen, setIsCourseModalOpen ] = useState<boolean>(false)
    const [ openCourseId, setOpenCourseId ] = useState<number | undefined | null>()
    const [ courseInfo, setCourseInfo ] = useState<Curso>()
    const [ authorId, setAuthorId ] = useState<number | string>('')
    const [ authorInfo, setAuthorInfo ] = useState<Author>()
    const [ technology, setTechnology ] = useState<string>('')
    const [ userId, setUserId ] = useState<number | undefined>()
    const [ isCreateCourseModalOpen, setIsCreateCourseModalOpen ] = useState<boolean>(false)

    // Estados para renderizar nuevamente la lista de tecnologias y autores al añadirse uno nuevo;
    const [ toggleTechState, setToggleTechState ] = useState<boolean>(false)
    const [ toggleAuthorState, setToggleAuthorState ] = useState<boolean>(false)

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
                    userId, setUserId,
                    isCreateCourseModalOpen, setIsCreateCourseModalOpen,
                    toggleTechState, setToggleTechState,
                    toggleAuthorState, setToggleAuthorState
                }   
            }
        >
            { children }
        </CoursesContext.Provider>
    )
}