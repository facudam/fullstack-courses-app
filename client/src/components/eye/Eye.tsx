import styles from './Eye.module.css'

const Eye = () => {

    return(
        <div className={ styles.eye }>
            <div className={ styles['eye-iris'] }>
                <div className={ styles['eye-pupil'] }></div>
            </div>
        </div>
    )
}

export default Eye