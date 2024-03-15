import { Link } from "react-router-dom"
import styles from './SecondaryNav.module.css'
import { FC } from "react"
import { hat } from "../../assets/images/images"

interface Props {
    question: string,
    href: string,
    linkText: string
}

const SecondaryNav: FC<Props> = ({ question, href, linkText }) => {
    return (
        <nav className={ styles.nav }>
            <Link to="/" className={ styles.logo }>
                <img src={ hat } />
                <span translate="no">CoursesLibra</span>
                <span>Beta</span>
            </Link>
            <div className={ styles['nav-link-ctn'] }>
                <span>{ question }</span>
                <Link to={ href }>{ linkText }</Link>
            </div>
      </nav>
    )
}

export default SecondaryNav;