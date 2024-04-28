import { createContext } from 'react';
import { Author, Curso } from '../interfaces/models';

interface CoursesContext {
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: (isAuthenticated: boolean | undefined) => void,
  userName: string,
  setUserName: (userName: string) => void,
  isCourseModalOpen: boolean,
  setIsCourseModalOpen: (isCourseModalOpen: boolean) => void,
  openCourseId: number | null | undefined,
  setOpenCourseId: (openCourseId: number | undefined | null) => void,
  courseInfo: Curso | undefined, 
  setCourseInfo: (courseInfo: Curso) => void,
  authorId: number | string, 
  setAuthorId: (authorId: number | string) => void,
  authorInfo: Author | undefined, 
  setAuthorInfo: (authorInfo: Author | undefined) => void,
  technology: string,
  setTechnology: (technology: string) => void,
  userId: number | undefined,
  setUserId: (userId: number | undefined) => void,
  isCreateCourseModalOpen: boolean, 
  setIsCreateCourseModalOpen: (isCreateCourseModalOpen: boolean) =>void,
  toggleTechState: boolean, 
  setToggleTechState: (toggleTechState: boolean) => void,
  toggleAuthorState: boolean, 
  setToggleAuthorState: (toggleTechState: boolean) => void,
  token: string,
  setToken: (token: string) => void,
  alertNewCourseWasAdded: boolean,
  setAlertNewCourseWasAdded: (alertNewCourseWasAdded: boolean) => void,
  starsAssigned: number, 
  setStarsAssigned: (starsAssigned: number) => void

}

const initialState: CoursesContext = {
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean | undefined) => { isAuthenticated },
  userName: '',
  setUserName: (userName: string) => { userName },
  isCourseModalOpen: false,
  setIsCourseModalOpen: (isCourseModalOpen: boolean) => { isCourseModalOpen },
  openCourseId: null,
  setOpenCourseId: (openCourseId: number | undefined | null) => { openCourseId },
  courseInfo: undefined, 
  setCourseInfo: (courseInfo: Curso | undefined) => { courseInfo },
  authorId: '', 
  setAuthorId: (authorId: number | string) => { authorId },
  authorInfo: undefined, 
  setAuthorInfo: (authorInfo: Author | undefined) => { authorInfo },
  technology: '',
  setTechnology: (technology: string) => { technology },
  userId: undefined,
  setUserId: (userId: number | undefined) => { userId },
  isCreateCourseModalOpen: false,
  setIsCreateCourseModalOpen: (isCreateCourseModalOpen: boolean) => { isCreateCourseModalOpen },
  toggleTechState: false, 
  setToggleTechState: (toggleTechState: boolean) => { toggleTechState },
  toggleAuthorState: false, 
  setToggleAuthorState: (toggleTechState: boolean) => { toggleTechState },
  token: '',
  setToken: (token: string) => { token },
  alertNewCourseWasAdded: false,
  setAlertNewCourseWasAdded: (alertNewCourseWasAdded: boolean) => { alertNewCourseWasAdded },
  starsAssigned: 3, 
  setStarsAssigned: (starsAssigned: number) => {starsAssigned}
}

export const CoursesContext = createContext<CoursesContext>(initialState);