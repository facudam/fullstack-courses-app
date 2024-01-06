import { createContext } from 'react';

interface CoursesContext {
  isAuthenticate: boolean | undefined;
  setIsAuthenticate: (isAuthenticate: boolean) => void,
  userName: string,
  setUserName: (userName: string) => void
}

const initialState: CoursesContext = {
  isAuthenticate: undefined,
  setIsAuthenticate: (isAuthenticate: boolean) => { isAuthenticate },
  userName: '',
  setUserName: (userName: string) => { userName }
}

export const CoursesContext = createContext<CoursesContext>(initialState);