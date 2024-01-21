import { FC } from 'react'
import ReactDOM from 'react-dom'
import styles from './CourseModal.module.css'


const CourseModal: FC = () => {
    return ReactDOM.createPortal(
        <>
            <div className={ styles['full-screen'] }></div>
            <div className={ styles.modal }>
                <main className={ styles.main }>
                    <div className={ styles['img-ctn'] }>
                        <img src='https://i.imgur.com/vo18v3s.jpg' />
                    </div>
                    <div className={ styles['info-ctn'] }>
                        <h2>Angular for Beginners Course [Full Front End Tutorial with TypeScript] </h2>
                        <p>Learn Angular in this complete course for beginners. First you will learn the basics of Typescript and then you will learn about important Angular concepts such as binding, dependency injection, forms, routing, and more. </p>
                        
                        <a href='' target='_blank'>Access course</a>
                        <div className={ styles.types }>
                            <span>Free</span>
                            <span>Angular</span>
                            <span>Front-End</span>
                            <span>FreeCodeCamp - USA</span>
                            <span>English</span>
                        </div>
                    </div>
                </main>
                <div className={ styles.comments }>
                    <h3>Comentarios:</h3>
                    <p>Juan: This course is very helpful. I learned a lot about React and Redux.</p>
                    <p>Mariano: This course is very helpful. I learned a lot about React and Redux.</p>
                    <p>Alan: This course is very helpful. I learned a lot about React and Redux.</p>
                    <p>Isabel: This course is very helpful. I learned a lot about React and Redux.</p>
                    <p>Jorge: This course is very helpful. I learned a lot about React and Redux.</p>
                    <p>Romina: This course is very helpful. I learned a lot about React and Redux.</p>
                </div>
            </div>
        </>,
        document.getElementById('portal') || document.createElement('div')
    )
}

export default CourseModal;