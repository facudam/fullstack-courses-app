import { FC, useContext } from "react";
import styles from './CreateCourse.module.css'
import ModalLayout from "../modalLayout/ModalLayout";
import { CoursesContext } from "../../context/CoursesContext";

const CreateCourse: FC = () => {

    const { setIsCreateCourseModalOpen } = useContext(CoursesContext)

    const closeModal = () => {
        setIsCreateCourseModalOpen(false)
    }

    return(
        <ModalLayout closeFn={ closeModal }>
            <form>
                <div className={ styles['space-beetwen']}>
                    <h2>Añade un nuevo curso:</h2>
                    <button onClick={ closeModal }>x</button>
                </div>
                
                <div className={ styles['grid-form'] }>
                    <div className={ styles['form-group'] }>
                        <label htmlFor="title">Título:</label>
                        <input id="title" type="text" placeholder="Escribe el título del curso" name="titulo" />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="description">Descripción:</label>
                        <textarea id="description" placeholder="Escribe la descripción del curso" name="descripción" />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="sampleFile">Imagen: <span>*.webp no permitido</span></label>
                        <input type="file" id="sampleFile" name="sampleFile" accept="image/jpeg, image/png, image/svg, image/gif" />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="link">Link:</label>
                        <input type="text" id="link" placeholder="Ingresa el link del curso" />
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="type">Selecciona un tipo:</label>
                        <select id="type" name="type">
                            <option value="Front-End">Front-End</option>
                            <option value="Back-End">Back-End</option>
                            <option value="UX UI Design">UX UI Design</option>
                            <option value="testing">Testing</option>
                        </select>
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="technology">Selecciona la tecnología:</label>
                        <select id="technology" name="technology">
                            <option value="JavaScript">JavaScript</option>
                            <option value="Angular">Angular</option>
                            <option value="ReactJS">ReactJS</option>
                            <option value="CSS">CSS</option>
                        </select>
                        {/* Acá va la logica para ver si la opcion otro está seleccionada. Despues lo hago */}
                        <div style={{border: "1px solid gray",  padding: "10px"}}>
                            <p>Nueva tecnología:</p>
                            <input type="text" placeholder="Ingrese la nueva tecnología" />
                            <button>Añadir tecnología</button>
                        </div>
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="author">Selecciona el autor:</label>
                        <select id="author" name="author">
                            <option value="Fernando Herrera">Fernando Herrera</option>
                            <option value="Lucas Dalto">Lucas Dalto</option>
                            <option value="Fazt">Fazt</option>
                            <option value="Juan Pablo De La Torre Valdez">Juan Pablo De La Torre Valdez</option>
                            <option value="otro">Otro</option>
                        </select>
                        {/* Acá la la logica para ver si la opcion otro está seleccionada. Despues lo hago */}
                        <div style={{ border: "1px solid gray", padding: "10px"}}>
                            <p>Nuevo autor:</p>
                            <input type="text" placeholder="Ingrese el nombre del autor" />
                            <input type="text" placeholder="Ingrese el país del autor" />
                            <button>Añadir autor</button>
                        </div>
                    </div>

                    <div className={ styles['form-group'] }>
                        <label htmlFor="costo">Selecciona el costo:</label>
                        <select id="costo" name="costo">
                            <option value="1">Gratis</option>
                            <option value="0">Pago</option>
                        </select>
                    </div>
                </div>
                <button style={{width: "100%", marginTop: "20px"}}>Añadir curso</button>
            </form>
        </ModalLayout>
    )
}

export default CreateCourse;