import { FC, FormEvent, useContext, useState } from "react";
import styles from './CreateCourse.module.css'
import ModalLayout from "../modalLayout/ModalLayout";
import { CoursesContext } from "../../context/CoursesContext";
import { useAuthor, useLanguage, useTechnology, useTypes } from "../../hooks";
// import { Curso,  } from "../../interfaces/models";
import addNewCourse from "../../services/api/endpoints/courses/addNewCourse";
import { AxiosResponse } from "axios";

const CreateCourse: FC = () => {

    const { setIsCreateCourseModalOpen } = useContext(CoursesContext)

    const { authors } = useAuthor();
    const { language } = useLanguage()
    const { types } = useTypes()
    const { technologies } = useTechnology()

    const [ techName, setTechname ] = useState<number | string>('')
    const [ authorName, setAuthorName ] = useState<number | string>('')
    const [ courseTitle, setCourseTitle ] = useState<string>('')
    const [ courseDescription, setCourseDescription ] = useState<string>('')
    const [ sampleFile, setSampleFile ] = useState<string | File | undefined>('')
    const [ link, setLink ] = useState<string>('')
    const [ courseType, setCourseType ] = useState<string | number>('')
    const [ courseCost, setCourseCost ] = useState<string | number>('')
    const [ withCertificate, setWithCertificate ] = useState<number | string>('')
    const [ courseLanguage, setCourseLanguage ] = useState<number | string>('')
    const [ authorCountry, setAuthorCountry ] = useState<string>('')

    const closeModal = () => {
        setIsCreateCourseModalOpen(false)
    }

    const newCourse = {
        title: courseTitle,
        description: courseDescription,
        is_free: Number(courseCost),
        resource_link: link,
        sampleFile: sampleFile,
        language_id: Number(courseLanguage),
        type_id: Number(courseType),
        author_id: Number(authorName),
        tech_id: Number(techName),
        with_certification: Number(withCertificate)
    }


    // const newTechnology: Technology = {
    //     tech_name: techName
    // }

    // const newAuthor: Author = {
    //     author_name: authorName,
    //     author_country: authorCountry
    // }

   
    console.log(newCourse)
    const handleNewCourse = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(newCourse)
        addNewCourse(newCourse)
            .then((respuesta: AxiosResponse) => {
                alert(respuesta)
            })
            .catch((error) => {
                alert(`ha habido un error: ${error}`)
            })
    }

    return(
        <ModalLayout closeFn={ closeModal }>
            <form onSubmit={(e) => handleNewCourse(e) } className={ styles.form }>
                <div className={ styles['space-beetwen']}>
                    <h2>Añade un nuevo curso</h2>
                    <button onClick={ closeModal }>x</button>
                </div>
                
                <div className={ styles['grid-form'] }>
                    <div className={ styles['form-group'] }>
                        <label htmlFor="title">Título</label>
                        <input
                            onChange={(e) => setCourseTitle(e.target.value)} 
                            id="title" 
                            type="text" 
                            placeholder="Escribe el título del curso" 
                            name="titulo"
                            value={ courseTitle } 
                        />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            onChange={(e) => setCourseDescription(e.target.value)}
                            id="description" 
                            placeholder="Escribe la descripción del curso" 
                            name="descripción"
                            value={ courseDescription }
                        />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="sampleFile">Imagen <span>*.webp no permitido</span></label>
                        <input
                            onChange={(e) => setSampleFile(e.target.files?.[0])}
                            type="file" 
                            id="sampleFile" 
                            name="sampleFile" 
                            accept="image/jpeg, image/png, image/svg, image/gif"
                        />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="link">Link</label>
                        <input
                            onChange={(e) => setLink(e.target.value)} 
                            type="text" 
                            id="link" 
                            placeholder="Ingresa el link del curso"
                            value={ link }
                        />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="type">Tipo</label>
                        <select
                            onChange={(e) => setCourseType(e.target.value)} 
                            id="type" name="type"
                            value={ courseType }
                        >
                            <option>Elige una opción</option>
                            {
                                types.map(tipo => (
                                    <option key={ tipo.type_id } value={ tipo.type_id }>{ tipo.type_name }</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="technology">Tecnología</label>
                        <select 
                            id="technology" 
                            name="technology" 
                            onChange={(e) => setTechname(e.target.value)}
                            value={ techName }
                        >
                            <option>Elige una opción</option>
                            {
                                technologies?.map(technology => (
                                    <option key={ technology.tech_id } value={ technology.tech_id }>{ technology.tech_name }</option>
                                ))
                            }
                            <option value='otro'>Otro</option>
                        </select>
                        {
                            (typeof techName == 'string' && techName == 'otro') &&
                                <div style={{border: "1px solid gray",  padding: "10px"}}>
                                    <p>Nueva tecnología:</p>
                                    <input
                                        value={ techName }
                                        onChange={(e) => setTechname(e.target.value)} 
                                        type="text" 
                                        placeholder="Ingrese la nueva tecnología" 
                                    />
                                    <button>Añadir tecnología</button>
                                </div> 
                        } 
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="author">Autor</label>
                        <select 
                            value={ authorName }
                            id="author" 
                            name="author" 
                            onChange={(e) => setAuthorName(e.target.value)}
                        >
                            <option>Elige una opción</option>
                            {
                                authors?.map((autor) => (
                                    <option key={ autor.author_id } value={ autor.author_id }>{ autor.author_name }</option>
                                ))    
                            }
                            <option value='otro'>Otro</option>
                        </select>
                        {
                            (authorName === 'otro') && 
                                <div style={{ border: "1px solid gray", padding: "10px"}}>
                                    <p>Nuevo autor:</p>
                                    <input
                                        value={ authorName }
                                        onChange={(e) => setAuthorName(e.target.value)} 
                                        type="text" 
                                        placeholder="Ingrese el nombre del autor" 
                                    />
                                    <input
                                        value={ authorCountry }
                                        onChange={(e) => setAuthorCountry(e.target.value)} 
                                        type="text" 
                                        placeholder="Ingrese el país del autor" 
                                    />
                                    <button>Añadir autor</button>
                                </div> 
                        }
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="costo">Costo</label>
                        <select
                            onChange={(e) => setCourseCost(e.target.value)} 
                            id="costo" 
                            name="costo"
                            value={ courseCost }
                        >
                            <option>Elige una opción</option>
                            <option value={1}>Gratis</option>
                            <option value={0}>Pago</option>
                        </select>
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="language">Idioma</label>
                        <select
                            value={courseLanguage}
                            onChange={(e) => setCourseLanguage(e.target.value)}
                            id="language" 
                            name="language"
                        >
                            <option>Elige una opción</option>
                            {
                                language.map(idioma => (
                                    <option key={ idioma.language_id } value={ idioma.language_id }>{ idioma.language_name }</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={ styles['form-group'] }>
                        <label htmlFor="certificated">Certificación</label>
                        <select
                            onChange={(e) => setWithCertificate(e.target.value)} 
                            id="certificated" 
                            name="certificated"
                            value={ withCertificate }
                        >
                            <option>Elige una opción</option>
                            <option value={1}>Certificado</option>
                            <option value={0}>Sin certificación</option>
                        </select>
                    </div>
                </div>
                <button type="submit">Añadir curso</button>
            </form>
        </ModalLayout>
    )
}

export default CreateCourse;