
import { CoursesContext } from "./CoursesContext"
import { ReactNode, useState, FC } from "react"

interface ContextProviderProps {
    children?: ReactNode
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>()
    const [ userName, setUserName ] = useState<string>('')

    return(
        <CoursesContext.Provider 
            value={
                {
                    isAuthenticated, 
                    setIsAuthenticated,
                    userName,
                    setUserName
                }   
            }
        >
            { children }
        </CoursesContext.Provider>
    )
}