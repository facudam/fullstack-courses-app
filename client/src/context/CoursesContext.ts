import { createContext } from 'react';
import { Author, Curso } from '../interfaces/models';

interface CoursesContext {
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  userName: string,
  setUserName: (userName: string) => void,
  courseModalIsOpen: boolean,
  setCourseModalIsOpen: (courseModalIsOpen: boolean) => void,
  openCourseId: number | null | undefined,
  setOpenCourseId: (openCourseId: number | undefined | null) => void,
  courseInfo: Curso | undefined, 
  setCourseInfo: (courseInfo: Curso) => void,
  authorId: number | undefined, 
  setAuthorId: (authorId: number | undefined) => void,
  authorInfo: Author | undefined, 
  setAuthorInfo: (authorInfo: Author | undefined) => void

}

const initialState: CoursesContext = {
  isAuthenticated: undefined,
  setIsAuthenticated: (isAuthenticated: boolean) => { isAuthenticated },
  userName: '',
  setUserName: (userName: string) => { userName },
  courseModalIsOpen: false,
  setCourseModalIsOpen: (courseModalIsOpen: boolean) => { courseModalIsOpen },
  openCourseId: null,
  setOpenCourseId: (openCourseId: number | undefined | null) => { openCourseId },
  courseInfo: undefined, 
  setCourseInfo: (courseInfo: Curso | undefined) => { courseInfo },
  authorId: undefined, 
  setAuthorId: (authorId: number | undefined) => { authorId },
  authorInfo: undefined, 
  setAuthorInfo: (authorInfo: Author | undefined) => { authorInfo }
}

export const CoursesContext = createContext<CoursesContext>(initialState);