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
import CreateCourse from '../../modals/createCourseModal/CreateCourse';

const Home: FC = () => {

    const {
            isAuthenticated,
            setIsAuthenticated, 
            setUserName, 
            isCourseModalOpen, 
            setUserId,
            isCreateCourseModalOpen 
           }   = useContext(CoursesContext)

    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get(`${ apiBaseUrl }/api/validation`)
            .then((res: AxiosResponse) => {
                if(res.data.valid) {
                  setIsAuthenticated(true)
                  localStorage.setItem('isUserAuthenticated', 'true')
                  setUserId(res.data.user_id)
                  setUserName(res.data.username)
                } else {
                    setIsAuthenticated(false)
                    localStorage.setItem('isUserAuthenticated', 'false')
                }
            })
            .catch(err => {
                console.log(`Ups, ha ocurrido un error: ${ err }`)
            })
    }, [ isAuthenticated, setIsAuthenticated, setUserId, setUserName ])

  return (
    <MainLayout>
        <Header />
        <main className={ styles.main }>      
            <CoursesSection />
        </main>
        {
            isCourseModalOpen && <CourseModal />
        }
        {
            isCreateCourseModalOpen && <CreateCourse />
        }
    </MainLayout>
  )
}

export default Home;
