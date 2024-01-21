
interface Curso {
    course_id?: number,
    title: string,
    description: string,
    is_free: number,
    resource_link: string,
    image: string,
    language: string,
    type: string,
    author: string,
    author_id: number,
    technology: string
}

interface NavProps {
    handleLogout: () => void,
}

interface AuthNavProps {
    userName: string,
    handleLogout: () => void
}

interface CardProps {
    id: number | undefined,
    title: string,
    image: string,
    author: string,
    is_free: number,
    technology: string
}

interface Author {
    author_id: number,
    author_name: string,
    author_country: string
}

export type { Curso, NavProps, CardProps, AuthNavProps, Author }