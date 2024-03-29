import { FC, useContext, useState } from "react";
import styles from './CreateCourse.module.css'
import ModalLayout from "../modalLayout/ModalLayout.tsx";
import { CoursesContext } from "../../context/CoursesContext";
import { useAuthor, useLanguage, useTechnology, useTypes } from "../../hooks";
import axios, { AxiosResponse } from "axios";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";
import { CourseRequest } from "../../interfaces/models";
import TechForm from "../../components/techForm/TechForm";
import AuthorForm from "../../components/authorForm/AuthorForm";
import { courseValidationForm, errorMessages } from "./validation";

const CreateCourse: FC = () => {

    const { setIsCreateCourseModalOpen, userId } = useContext(CoursesContext)

    const { authors } = useAuthor();
    const { language } = useLanguage()
    const { types } = useTypes()
    const { technologies } = useTechnology()

    const [ hasAnyError, setHasAnyError ] = useState<boolean>(false)

    const [ formData, setFormData ] = useState<CourseRequest>({
        title: '',
        is_free: '',
        resource_link: '',
        description: '',
        language_id: '',
        type_id: '',
        tech_id: '',
        author_id: '',
        with_certification: '',
        sampleFile: null,
        user_id: userId
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file !== null && file !== undefined) setFormData({ ...formData, sampleFile: file });
    }

    const closeModal = () => {
        setIsCreateCourseModalOpen(false)
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        const isValid = courseValidationForm(formData)

        if (!isValid) {
            setHasAnyError(true)
            return
        } 

        setHasAnyError(false)

        for (const key in formData) {
        const value = formData[key];
            if (value !== null) {
                formDataToSend.append(key, value as string | Blob);
            }
        }
        try {
            const response: AxiosResponse = await axios.post(`${apiBaseUrl}/api/courses`, formDataToSend, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data)
            alert('Curso añadido correctamente')
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('error al enviar datos: ' + error)
        }
      };

    return(
        <ModalLayout closeFn={ closeModal }>
            <form onSubmit={handleSubmit} className={ styles.form }>
                <div className={`${styles.header} ${styles['space-beetwen']}`}>
                    <h2>Añade un nuevo curso</h2>
                    <button onClick={ closeModal }>x</button>
                </div>
                <div className={ styles['grid-form'] }>
                    <div className={ styles['form-group'] }>
                        <div className={ styles['space-beetwen'] }>
                            <label htmlFor="title">Título</label>
                            <span className={ styles.length }>{ formData.title.length }/100</span>
                        </div>
                        
                        <input
                            onChange={handleChange} 
                            id="title" 
                            type="text" 
                            placeholder="Escribe el título del curso" 
                            name="title"
                            value={ formData.title } 
                            maxLength={ 100 }
                        />
                        {
                            (hasAnyError && formData.title.trim().length === 0)
                            && <span className={ styles['error-message'] }>{ errorMessages.title }</span>
                        }
                    </div>

                    <div className={ styles['form-group'] }>
                        <div className={ styles['space-beetwen'] }>
                            <label htmlFor="description">Descripción</label>
                            <span className={ styles.length }>{ formData.description.length }/600</span>
                        </div>
                        
                        <textarea
                            onChange={handleChange}
                            id="description" 
                            placeholder="Escribe la descripción del curso" 
                            name="description"
                            value={ formData.description }
                            maxLength={ 600 }
                        />
                        {
                            (hasAnyError && formData.description.trim().length === 0)
                            && <span className={ styles['error-message'] }>{ errorMessages.description }</span>
                        }
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="sampleFile">Imagen <span className={ styles.length }>*.webp no permitido</span></label>
                        <input
                            onChange={handleFileChange}
                            type="file" 
                            id="sampleFile" 
                            name="sampleFile" 
                            accept="image/jpeg, image/png, image/svg, image/gif"
                        />
                        {
                            (hasAnyError && formData.sampleFile === null)
                                && <span className={ styles['error-message'] }>{ errorMessages.sampleFile }</span>
                        }
                    </div>

                    <div className={ styles['form-group'] }>
                        <div className={ styles['space-beetwen'] }>
                            <label htmlFor="link">Link</label>
                            <span className={ styles.length }>{formData.resource_link.length}/250</span>
                        </div>
                        
                        <input
                            onChange={handleChange}
                            name="resource_link"
                            type="text" 
                            id="link" 
                            placeholder="Ingresa el link del curso"
                            value={ formData.resource_link }
                            maxLength={ 250 }
                        />
                        {
                            (hasAnyError && formData.resource_link.trim().length === 0)
                                && <span className={ styles['error-message'] }>{ errorMessages.resource_link }</span>
                        }
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="type">Tipo</label>
                        <select
                            onChange={handleChange}
                            id="type" 
                            name="type_id"
                            value={ formData.type_id }
                        >
                            <option value=''>Elige una opción</option>
                            {
                                types.map(tipo => (
                                    <option 
                                        key={ tipo.type_id } 
                                        value={ tipo.type_id }
                                    > { tipo.type_name }
                                    </option>
                                ))
                            }
                        </select>
                        {
                            (hasAnyError && formData.type_id === '')
                                && <span className={ styles['error-message'] }>{ errorMessages.type_id }</span>
                        }
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="technology">Tecnología</label>
                        <select 
                            id="technology" 
                            name="tech_id" 
                            onChange={handleChange}
                            value={ formData.tech_id }
                        >
                            <option value=''>Elige una opción</option>
                            {
                                technologies?.map(technology => (
                                    <option key={ technology.tech_id } value={ technology.tech_id }>{ technology.tech_name }</option>
                                ))
                            }
                            <option value='otro'>Añadir nueva tecnología</option>
                        </select>
                        {
                            (formData.tech_id === 'otro') &&
                                <TechForm />
                        }
                         {
                            (hasAnyError && (formData.tech_id === '' || formData.tech_id === 'otro'))
                                && <span className={ styles['error-message'] }>{ errorMessages.tech_id }</span>
                        }
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="author">Autor</label>
                        <select 
                            value={ formData.author_id}
                            id="author" 
                            name="author_id" 
                            onChange={handleChange}
                        >
                            <option value=''>Elige una opción</option>
                            {
                                authors?.map((autor) => (
                                    <option key={ autor.author_id } value={ autor.author_id }>{ autor.author_name }</option>
                                ))    
                            }
                            <option value='otro'>Añadir nuevo autor</option>
                        </select>
                        {
                            (formData.author_id === 'otro') &&
                                <AuthorForm />
                        }
                         {
                            (hasAnyError && (formData.author_id === '' || formData.author_id === 'otro'))
                                && <span className={ styles['error-message'] }>{ errorMessages.author_id }</span>
                        }
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="costo">Costo</label>
                        <select
                            onChange={handleChange} 
                            id="costo" 
                            name="is_free"
                            value={ formData.is_free }
                        >
                            <option value=''>Elige una opción</option>
                            <option value={1}>Gratis</option>
                            <option value={0}>Pago</option>
                        </select>
                        {
                            (hasAnyError && (formData.is_free === ''))
                                && <span className={ styles['error-message'] }>{ errorMessages.is_free }</span>
                        }
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="language">Idioma</label>
                        <select
                            value={formData.language_id}
                            onChange={handleChange}
                            id="language" 
                            name="language_id"
                        >
                            <option value=''>Elige una opción</option>
                            {
                                language.map(idioma => (
                                    <option key={ idioma.language_id } value={ idioma.language_id }>{ idioma.language_name }</option>
                                ))
                            }
                        </select>
                        {
                            (hasAnyError && (formData.language_id === ''))
                                && <span className={ styles['error-message'] }>{ errorMessages.language_id }</span>
                        }
                    </div>
                    <div className={ styles['form-group'] }>
                        <label htmlFor="certificated">Certificación</label>
                        <select
                            onChange={handleChange}
                            id="certificated" 
                            name="with_certification"
                            value={ formData.with_certification }
                        >
                            <option value=''>Elige una opción</option>
                            <option value={1}>Certificado</option>
                            <option value={0}>Sin certificación</option>
                        </select>
                        {
                            (hasAnyError && (formData.with_certification === ''))
                                && <span className={ styles['error-message'] }>{ errorMessages.with_certification }</span>
                        }
                    </div>
                </div>
                <button type="submit">Añadir curso</button>
            </form>
        </ModalLayout>
    )
}

export default CreateCourse;