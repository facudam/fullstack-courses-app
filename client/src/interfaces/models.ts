
interface Curso {
    course_id?: number,
    title: string,
    description: string,
    is_free: boolean,
    resource_link: string,
    image: string,
    language_id: number,
    type_id: number,
    author_id: number,
    tech_id: number
}

interface NavProps {
    isAuthenticate: boolean | undefined,
    handleLogout: () => void
}

export type { Curso, NavProps }