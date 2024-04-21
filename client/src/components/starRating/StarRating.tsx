import { halfStar, star } from "../../assets/images/images";
import { FC } from "react";
import styles from './StarRating.module.css'

interface Props {
    rating: number
}
const StarRating: FC<Props> = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return(
        <div className={ styles['flex-ctn'] }>
            <p><strong>{Number(rating).toFixed(1)}</strong></p>
            <div className={ styles['stars-ctn'] }>
                {
                    [...Array(filledStars)].map((_, index) => (
                        <img width={16} src={ star } key={index} alt="estrella"  />
                    ))
                }
                {
                    hasHalfStar && <img width={16} src={ halfStar } alt="media estrella" />
                }
            </div>
        </div>
    )
}

export default StarRating;