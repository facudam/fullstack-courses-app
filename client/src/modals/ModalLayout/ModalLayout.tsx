import { FC } from 'react';
import ReactDOM from 'react-dom'
import styles from './ModalLayout.module.css'

interface ModalLayoutProps {
    children?: React.ReactNode,
    closeFn: () => void
}

const ModalLayout: FC<ModalLayoutProps> = ({ children, closeFn }) => {
    return ReactDOM.createPortal(
        <>
            <div onClick={ closeFn } className={ styles['full-screen'] }></div>
            <div className={ styles.modal }>
                { children }
            </div>
        </>,
        document.getElementById('portal') || document.createElement('div')
    )
}

export default ModalLayout;