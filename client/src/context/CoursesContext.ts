import { createContext } from 'react';

interface CoursesContext {
  isAuthenticate: boolean | undefined;
  setIsAuthenticate: (isAuthenticate: boolean) => void
}

const initialState: CoursesContext = {
  isAuthenticate: undefined,
  setIsAuthenticate: (isAuthenticate: boolean) => { isAuthenticate }
}

export const CoursesContext = createContext<CoursesContext>(initialState);