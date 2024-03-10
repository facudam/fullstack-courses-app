import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
    children: React.ReactNode
}

const PublicRoute: FC<PublicRouteProps> = ({ children }) => {

    const [ isUserLogged, setIsUserLogged ] = useState<boolean | null>(null)
   
    useEffect(() => {
        const storageData: string | null = localStorage.getItem('isUserAuthenticated');
        if (storageData) setIsUserLogged(JSON.parse(storageData))
    }, [])

    return (!isUserLogged)
        ? children
        : <Navigate to="/" />
}

export default PublicRoute;