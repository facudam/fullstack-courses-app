import { Curso } from "../interfaces/models";

const filterByType = (item: Curso, tipo: string) => tipo === '' || item.type === tipo;

const filterByAuthor = (item: Curso, autor: string) => autor === '' || item.author?.toLowerCase().includes(autor.toLowerCase());

const filterByLanguage = (item: Curso, idioma: string) => idioma === '' || item.language === idioma;

const filterByFree = (item: Curso, esGratis: number | string) => {
    if (esGratis === "") return true;
    return item.is_free === Number(esGratis);
};

const filterByCertification = (item: Curso, certificated: number | string) => {
    if (certificated === "") return true;
    return item.with_certification === Number(certificated);
}

function filteringCoursesByTech(cursos: Curso[], technology: string) {
    const cursosExactos = cursos.filter(curso => 
        (typeof curso.technology === 'string') &&
        curso.technology.toLowerCase() === technology.toLowerCase());
    
    if (!cursosExactos.length) {
        const cursosParciales = cursos.filter(curso => 
            (typeof curso.technology === 'string') &&
            curso.technology.toLowerCase().includes(technology.toLowerCase()));
        return cursosParciales;
    }
    
    return cursosExactos;
}

export { filterByAuthor, filterByFree, filterByLanguage, filterByType, filterByCertification, filteringCoursesByTech }