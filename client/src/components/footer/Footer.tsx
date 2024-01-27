import { FC } from "react"
import styles from './Footer.module.css'

const Footer: FC = () => {
    return (
        <footer className={ styles.footer }>
            <ul>
                <li>Developed by <a href="https://www.linkedin.com/in/facundo-caceres-dev" target="_blank" rel="noopenner noreferrer nofollow">Facundo Cáceres</a></li>
                <li>See <a href="https://github.com/facudam/fullstack-courses-app" target="_blank" rel="noopenner noreferrer nofollow">code</a></li>
            </ul>
        </footer>
    )
}

export default Footer