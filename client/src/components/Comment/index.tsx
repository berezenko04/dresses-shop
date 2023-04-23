import styles from './Comment.module.scss'

//icons
import { ReactComponent as StarIcon } from '@/assets/icons/star.svg'
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg'
import { ReactComponent as DislikeIcon } from '@/assets/icons/dislike.svg'

//utils
import { formatDate } from '@/utils/formatDate';

//types
import { Comment as CommentProps } from '@/redux/comments/types';

const Comment: React.FC<CommentProps> = ({ text, date, rating, likes, dislikes }) => {
    return (
        <div className={styles.comment}>
            <div className={styles.comment__head}>
                <div className={styles.comment__head__avatar}>

                </div>
                <div className={styles.comment__head__rating}>
                    <ul>
                        {[...Array(5)].map((_, index) => (
                            <li key={index}><StarIcon /></li>
                        ))}
                    </ul>
                    <p>Roman Berezenko</p>
                </div>
            </div>
            <p className={styles.comment__text}>{text}</p>
            <div className={styles.comment__footer}>
                <span>{formatDate(date)}</span>
                <div className={styles.comment__footer__likes}>
                    <button>
                        <LikeIcon />
                        {likes}
                    </button>
                    <button>
                        <DislikeIcon />
                        {dislikes}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Comment