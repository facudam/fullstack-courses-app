interface Author {
    author_name: string,
    author_country: string
}

interface CourseLanguage {
    language_name: string
}

interface Type {
    type_name: string
}

interface Technology {
    tech_name: string
}

interface Course {
    title: string,
    is_free: boolean | number,
    resource_link: string,
    rating: number | null,
    description: string,
    image?: string,
    language_id: number,
    type_id: number,
    tech_id: number
}


export {
    Author,
    CourseLanguage,
    Type,
    Technology,
    Course,
}