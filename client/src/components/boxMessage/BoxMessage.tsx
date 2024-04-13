import { FC } from "react"
import styles from './BoxMessage.module.css'

interface Props {
    message: string
}
export const BoxMessage: FC<Props> = ({ message }) => {
    return (
        <div className={ styles['box-message']}>
            <p>{ message }</p>
        </div> 
    )
}
