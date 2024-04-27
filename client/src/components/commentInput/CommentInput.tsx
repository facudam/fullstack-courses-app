import { ChangeEvent, FC } from 'react';
import styles from './CommentInput.module.css'

interface CommentInputProps {
    newComment: string;
    handleNewComment: () => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    textButton: string
}

const CommentInput: FC<CommentInputProps> = ({ newComment, handleNewComment, handleChange, placeholder, textButton }) => {

    return(
        <div className={ styles['comment-input-ctn'] }>
            <h3>¿Ya completaste el curso? Comparte tu experiencia con la comunidad</h3>
            <div className={ styles['comment-section'] }>
                <input 
                    type='text' 
                    value={ newComment } 
                    onChange={ handleChange } 
                    maxLength={ 200 }
                    placeholder={ placeholder }
                />
                <span>{ newComment.length }/200</span>
                <button onClick={ handleNewComment }>{ textButton }</button>
            </div>
        </div> 
    )
}

export default CommentInput;