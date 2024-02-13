
interface ValidationData {
    title: string,
    description: string,
    sampleFile: null | File
    resource_link: string
    type_id: string | number,
    tech_id: string | number,
    author_id: string | number,
    is_free: string | number,
    language_id: string | number,
    with_certification: string | number
}

interface ErrorMessages {
    title: string,
    description: string,   
    sampleFile: string,
    resource_link: string,
    type_id: string,
    tech_id: string,
    author_id: string,
    is_free: string,
    language_id: string,
    with_certification: string
}

export const courseValidationForm = (data: ValidationData): boolean => {
    const hasAnyError = 
        data.title.trim().length === 0 ||
        data.title.trim().length > 100 ||

        data.description.trim().length === 0 ||
        data.description.trim().length > 600 ||

        data.sampleFile === null ||

        data.resource_link.trim().length === 0 ||
        data.resource_link.trim().length > 250 ||

        isNaN(Number(data.type_id)) ||

        isNaN(Number(data.tech_id)) ||

        isNaN(Number(data.author_id)) ||

        isNaN(Number(data.is_free)) ||

        isNaN(Number(data.language_id)) ||

        isNaN(Number(data.with_certification));

    return !hasAnyError
}

export const errorMessages: ErrorMessages = {
    title: 'Por favor, ingresa un título.',
    description: 'Por favor, ingresa una descripción',   
    sampleFile: 'Por favor, ingresa una imagen',
    resource_link: 'Por favor, ingresa el link del curso',
    type_id: 'Por favor, selecciona un tipo',
    tech_id: 'Por favor, selecciona una tecnología',
    author_id: 'Por favor, selecciona el autor',
    is_free: 'Por favor, selecciona el costo',
    language_id: 'Por favor, selecciona el idioma del curso',
    with_certification: 'Por favor, indique si el curso posee un certificado de finalización'
}

