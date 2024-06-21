import axios from "axios";
import { FC, useContext, useEffect } from "react";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";
import MainLayout from "../../layouts/MainLayout";
import { CoursesContext } from "../../context/CoursesContext";
import { Header } from "../../components/header/Header";
import CoursesSection from "../../sections/CoursesSection/CoursesSection";
import styles from './Home.module.css'
import CourseModal from "../../modals/courseModal/CourseModal";
import CreateCourse from '../../modals/createCourseModal/CreateCourse';

const Home: FC = () => {

    const {
            setIsAuthenticated, 
            setUserName, 
            isCourseModalOpen, 
            setUserId,
            isCreateCourseModalOpen,
          } = useContext(CoursesContext)


        useEffect(() => {
            const fetchData = async () => {
              try {
                const { data } = await axios.get(`${apiBaseUrl}/api/validation`, { withCredentials: true })
                if (data.valid) {
                  setIsAuthenticated(true);
                  setUserId(data.userId);
                  setUserName(data.username);
                } else {
                  setIsAuthenticated(false);
                }
              } catch (error) {
                setIsAuthenticated(false);
                console.log(`Ups, ha ocurrido un error al intentar realizar la validación: ${error}`);
              }
            };
            fetchData();
          }, []);

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
