import { FC } from 'react';
import ReactDOM from 'react-dom'
import styles from './ModalLayout.module.css'

interface ModalLayoutProps {
    children?: React.ReactNode,
    closeFn: () => void,
    maxWidth?: string
}

const ModalLayout: FC<ModalLayoutProps> = ({ children, closeFn, maxWidth = "1000px" }) => {
    return ReactDOM.createPortal(
        <>
            <div onClick={ closeFn } className={ styles['full-screen'] }></div>
            <div className={ styles.modal } style={{ "maxWidth": maxWidth }}>
                { children }
            </div>
        </>,
        document.getElementById('portal') || document.createElement('div')
    )
}

export default ModalLayout;