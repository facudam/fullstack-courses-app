
import { CoursesContext } from "./CoursesContext"
import { ReactNode, useState, FC } from "react"

interface ContextProviderProps {
    children?: ReactNode
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    
    const [ isAuthenticate, setIsAuthenticate ] = useState<boolean>()

    return(
        <CoursesContext.Provider 
            value={
                {
                    isAuthenticate, 
                    setIsAuthenticate
                }   
            }>
            { children }
        </CoursesContext.Provider>
    )
}