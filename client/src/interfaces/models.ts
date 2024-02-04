
interface Curso {
    course_id?: number,
    title: string,
    description: string,
    is_free: number | string,
    resource_link: string,
    image: string,
    language: string,
    type: string | number,
    author?: string,
    author_id: number | string,
    technology: string | number,
    with_certification: number | string
}

interface NavProps {
    handleLogout: () => void,
}

interface AuthNavProps {
    userName: string,
    handleLogout: () => void,
    handleNewCourse: () => void
}

interface CardProps {
    id: number | undefined,
    title: string,
    image: string,
    author: string,
    is_free: number | string,
    technology: string
}

interface Author {
    author_id?: number,
    author_name: string | number,
    author_country: string
}

interface Comment {
    comment_id?: number,
    comment_description: string,
    course_id: number,
    user: string
}

interface CommentResponse {
    comment_id?: number,
    comment_description: string,
    course_id: number | undefined,
    user_id: number | undefined
}

interface Types {
    type_id?: number,
    type_name: string
}

interface Language {
    language_id?: number,
    language_name: string
}

interface Technology {
    tech_id?: number,
    tech_name: string | number
}

export type 
            { 
                Curso,
                NavProps, 
                CardProps, 
                AuthNavProps, 
                Author, 
                Comment,
                CommentResponse,
                Types,
                Language,
                Technology
            }