
import { CoursesContext } from "./CoursesContext"
import { ReactNode, useState, FC } from "react"

interface ContextProviderProps {
    children?: ReactNode
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>()
    const [ userName, setUserName ] = useState<string>('')
    const [ courseModalIsOpen, setCourseModalIsOpen ] = useState<boolean>(false)

    return(
        <CoursesContext.Provider 
            value={
                {
                    isAuthenticated, 
                    setIsAuthenticated,
                    userName,
                    setUserName,
                    courseModalIsOpen,
                    setCourseModalIsOpen
                }   
            }
        >
            { children }
        </CoursesContext.Provider>
    )
}