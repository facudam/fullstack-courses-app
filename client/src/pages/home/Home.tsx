import axios from "axios";
import { FC, useContext, useEffect } from "react";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";
import MainLayout from "../../layouts/MainLayout";
import { CoursesContext } from "../../context/CoursesContext";
import { Header } from "../../components/header/Header";
import CoursesSection from "../../sections/CoursesSection/CoursesSection";
import styles from './Home.module.css'
import CourseModal from "../../modals/courseModal/CourseModal";
import { AxiosResponse } from 'axios';

const Home: FC = () => {

    const { setIsAuthenticated, setUserName, isCourseModalOpen, setUserId }   = useContext(CoursesContext)

    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get(`${ apiBaseUrl }/api/validation`)
            .then((res: AxiosResponse) => {
                if(res.data.valid) {
                  setIsAuthenticated(true)
                  setUserId(res.data.user_id)
                  setUserName(res.data.username)
                } else {
                    setIsAuthenticated(false)
                }
            })
            .catch(err => {
                console.log(`Ups, ha ocurrido un error: ${ err }`)
            })
    })

  return (
    <MainLayout>
        <Header />
        <main className={ styles.main }>      
            <CoursesSection />
        </main>
        {
            isCourseModalOpen && <CourseModal />
        }
    </MainLayout>
  )
}

export default Home;
