import { emptyStar, halfStar, star } from "../../assets/images/images";
import { FC } from "react";
import styles from './StarRating.module.css'

interface Props {
    rating: number,
    rates_quantity: number
}
const StarRating: FC<Props> = ({ rating, rates_quantity }) => {
    const maxStars: number = 5;
    const filledStars: number = Math.floor(rating);
    const hasHalfStar: boolean = rating % 1 !== 0;
    const restOfStars: number = maxStars - filledStars - (hasHalfStar ? 1 : 0);

    return(
        <div className={ styles['flex-ctn'] }>
            <p><strong>{ Number(rating).toFixed(1) }</strong></p>
            <div className={ styles['stars-ctn'] }>
                {
                    [...Array(filledStars)].map((_ , index) => (
                        <img width={ 16 } src={ star } key={ index } alt="estrella"  />
                    ))
                }
                {
                    hasHalfStar && <img width={ 16 } src={ halfStar } alt="media estrella" />
                }
                {
                    [...Array(restOfStars)].map((_ , index) => (
                        <img width={ 16 } src={ emptyStar } key={ index } alt="estrella"  />
                    ))
                }
                
            </div>
            <p className={ styles.quantity }>({ rates_quantity })</p>
        </div>
    )
}

export default StarRating;