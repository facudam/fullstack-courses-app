import { FC } from "react";
import styles from './BoxMessage.module.css'

interface Props {
    message: string
}
export const BoxMessage: FC<Props> = ({ message }) => {
    return (
        // El data-testid es para los tests.
        <div data-testid="test-message" className={ styles['box-message']}>
            <p>{ message }</p>
        </div> 
    )
}
