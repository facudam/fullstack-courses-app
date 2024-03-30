import styles from './CourseModalLoading.module.css';

const CourseModalLoading = () => {
    return (
        <>
            <div className={ styles.main }>
                <div className={ styles['img-ctn']}>
                </div>
                <div className={ styles['info-ctn'] }>
                    <div className={ styles['info-ctn__title'] }></div>
                    <div className={ styles['info-ctn__paragraph'] }></div>
                    <div className={ styles['info-ctn__info-link'] }></div>
                    <div className={ styles['tags-ctn'] }>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className={ styles['comments-ctn'] }>
                <div className={ styles['comments-title'] }></div>
                <div className={ styles['comments-title'] }></div>
                <div className={ styles['comments-title'] }></div>
            </div>
        </>
    )
}

export default CourseModalLoading;