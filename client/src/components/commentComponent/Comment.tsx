import { FC } from "react";
import styles from './Comment.module.css'

interface CommmentProps {
    userName: string,
    comment: string
}

const UserComment: FC<CommmentProps> = ({ userName, comment }) => {
  return (
    <div className={ styles['comment-ctn'] }>
        <h4>{ userName }</h4>
        <p>{ comment }</p>
    </div>
  )
}

export default UserComment;
