import { FC } from "react";
import { CardProps } from "../../interfaces/models";
import styles from './Card.module.css'


const Card: FC<CardProps> = ({ title, author, image, is_free, technology}) => {
    return(
        <div className={ styles.card }>
            <div className={ styles['image-ctn'] }>
                <img src={ image } alt=""/>
            </div>
            <h3>{ title }</h3>
            <div className={ styles['full-data-card'] }>
                <div className={ styles['info-card'] }>
                    <span>{ technology }</span>
                    <span>{ (is_free === 0) ? 'Paid' : 'Free' }</span>
                </div>
                <p><span>Por </span>{ author }</p> 
            </div>
        </div>
    )
}

export default Card