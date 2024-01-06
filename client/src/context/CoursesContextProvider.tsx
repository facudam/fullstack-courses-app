
import { CoursesContext } from "./CoursesContext"
import { ReactNode, useState, FC } from "react"

interface ContextProviderProps {
    children?: ReactNode
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    
    const [ isAuthenticate, setIsAuthenticate ] = useState<boolean>()
    const [ userName, setUserName ] = useState<string>('')

    return(
        <CoursesContext.Provider 
            value={
                {
                    isAuthenticate, 
                    setIsAuthenticate,
                    userName,
                    setUserName
                }   
            }>
            { children }
        </CoursesContext.Provider>
    )
}