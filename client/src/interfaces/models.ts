
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
    technology: string
}

interface NavProps {
    handleLogout: () => void,
}

interface CardProps {
    title: string,
    image: string,
    author: string,
    is_free: number,
    technology: string
}

export type { Curso, NavProps, CardProps }