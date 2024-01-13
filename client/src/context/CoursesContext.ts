import { createContext } from 'react';

interface CoursesContext {
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: (isAuthenticate: boolean) => void,
  userName: string,
  setUserName: (userName: string) => void
}

const initialState: CoursesContext = {
  isAuthenticated: undefined,
  setIsAuthenticated: (isAuthenticated: boolean) => { isAuthenticated },
  userName: '',
  setUserName: (userName: string) => { userName }
}

export const CoursesContext = createContext<CoursesContext>(initialState);