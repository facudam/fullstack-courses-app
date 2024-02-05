import { FC, useContext, useState } from "react";
import styles from './CreateCourse.module.css'
import ModalLayout from "../modalLayout/ModalLayout";
import { CoursesContext } from "../../context/CoursesContext";
import { useAuthor, useLanguage, useTechnology, useTypes } from "../../hooks";
import axios, { AxiosResponse } from "axios";
import apiBaseUrl from "../../services/api/endpoints/apiBaseUrl";
import { CourseRequest } from "../../interfaces/models";

const CreateCourse: FC = () => {

    const { setIsCreateCourseModalOpen } = useContext(CoursesContext)

    const { authors } = useAuthor();
    const { language } = useLanguage()
    const { types } = useTypes()
    const { technologies } = useTechnology()

    const [formData, setFormData] = useState<CourseRequest>({
        title: '',
        is_free: '',
        resource_link: '',
        description: '',
        language_id: '',
        type_id: '',
        tech_id: '',
        author_id: '',
        with_certification: '',
        sampleFile: null
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file !== null && file !== undefined) {
            setFormData({ ...formData, sampleFile: file});
        }
    };

    const closeModal = () => {
        setIsCreateCourseModalOpen(false)
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSend = new FormData();

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
            alert('error al enviar datos')
        }
      };

    return(
        <ModalLayout closeFn={ closeModal }>
            <form onSubmit={handleSubmit} className={ styles.form }>
                <div className={ styles['space-beetwen']}>
                    <h2>Añade un nuevo curso</h2>
                    <button onClick={ closeModal }>x</button>
                </div>
                
                <div className={ styles['grid-form'] }>
                    <div className={ styles['form-group'] }>
                        <label htmlFor="title">Título</label>
                        <input
                            onChange={handleChange} 
                            id="title" 
                            type="text" 
                            placeholder="Escribe el título del curso" 
                            name="title"
                            value={ formData.title } 
                        />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            onChange={handleChange}
                            id="description" 
                            placeholder="Escribe la descripción del curso" 
                            name="description"
                            value={ formData.description }
                        />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="sampleFile">Imagen <span>*.webp no permitido</span></label>
                        <input
                            onChange={handleFileChange}
                            type="file" 
                            id="sampleFile" 
                            name="sampleFile" 
                            accept="image/jpeg, image/png, image/svg, image/gif"
                        />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="link">Link</label>
                        <input
                            onChange={handleChange}
                            name="resource_link"
                            type="text" 
                            id="link" 
                            placeholder="Ingresa el link del curso"
                            value={ formData.resource_link }
                        />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="type">Tipo</label>
                        <select
                            onChange={handleChange}
                            id="type" 
                            name="type_id"
                            value={ formData.type_id }
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
                            name="tech_id" 
                            onChange={handleChange}
                            value={ formData.tech_id }
                        >
                            <option>Elige una opción</option>
                            {
                                technologies?.map(technology => (
                                    <option key={ technology.tech_id } value={ technology.tech_id }>{ technology.tech_name }</option>
                                ))
                            }
                            <option value='otro'>Otro</option>
                        </select>
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="author">Autor</label>
                        <select 
                            value={ formData.author_id}
                            id="author" 
                            name="author_id" 
                            onChange={handleChange}
                        >
                            <option>Elige una opción</option>
                            {
                                authors?.map((autor) => (
                                    <option key={ autor.author_id } value={ autor.author_id }>{ autor.author_name }</option>
                                ))    
                            }
                            <option value='otro'>Otro</option>
                        </select>
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="costo">Costo</label>
                        <select
                            onChange={handleChange} 
                            id="costo" 
                            name="is_free"
                            value={ formData.is_free }
                        >
                            <option>Elige una opción</option>
                            <option value={1}>Gratis</option>
                            <option value={0}>Pago</option>
                        </select>
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="language">Idioma</label>
                        <select
                            value={formData.language_id}
                            onChange={handleChange}
                            id="language" 
                            name="language_id"
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
                            onChange={handleChange}
                            id="certificated" 
                            name="with_certification"
                            value={ formData.with_certification }
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