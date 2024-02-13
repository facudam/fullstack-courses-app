
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