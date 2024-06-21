import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";

interface PublicRouteProps {
    children: React.ReactNode
}

const PublicRoute: FC<PublicRouteProps> = ({ children }) => {

    const [ isUserLogged, setIsUserLogged ] = useState<boolean | null>(null)
   
    useEffect(() => {
        const fetchData = async () => {
            try {
              const { data } = await axios.get(`${apiBaseUrl}/api/validation`, { withCredentials: true })
              if (data.valid) {
                setIsUserLogged(true)
              } else {
                setIsUserLogged(false)
              }
            } catch (error) {
              console.log(`Ups, ha ocurrido un error al intentar realizar la validación: ${error}`);
            }
          };
          fetchData();
    }, [])

    return (!isUserLogged)
        ? children
        : <Navigate to="/" />
}

export default PublicRoute;