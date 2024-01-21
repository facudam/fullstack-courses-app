import { createContext } from 'react';

interface CoursesContext {
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  userName: string,
  setUserName: (userName: string) => void,
  courseModalIsOpen: boolean,
  setCourseModalIsOpen: (courseModalIsOpen: boolean) => void
}

const initialState: CoursesContext = {
  isAuthenticated: undefined,
  setIsAuthenticated: (isAuthenticated: boolean) => { isAuthenticated },
  userName: '',
  setUserName: (userName: string) => { userName },
  courseModalIsOpen: false,
  setCourseModalIsOpen: (courseModalIsOpen: boolean) => { courseModalIsOpen }
}

export const CoursesContext = createContext<CoursesContext>(initialState);