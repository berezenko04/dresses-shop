import { useState } from 'react';
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

//styles
import styles from './PostComment.module.scss'

//redux
import { createComment } from '@/redux/comments/slice';
import { userDataSelector } from '@/redux/user/selectors';
import { commentsItemsSelector } from '@/redux/comments/selectors';

//icons
import { ReactComponent as StarActiveIcon } from '@/assets/icons/star.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star-empty.svg'

//utils
import { formatDate } from '@/utils/formatDate';


type PostCommentProps = {
    id?: string
}


const PostComment: React.FC<PostCommentProps> = ({ id }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const dispatch = useAppDispatch();
    const user = useSelector(userDataSelector);
    const comments = useSelector(commentsItemsSelector);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user?._id && id) {
            dispatch(createComment({
                itemId: id,
                comment: {
                    text: comment,
                    rating,
                    user: user._id,
                    date: formatDate(new Date().toString()),
                    likes: [],
                    dislikes: []
                }
            }));
            setRating(0);
            setComment('');
        } else {
            toast.error('Please login!');
        }
    }

    return (
        <div className={styles.commentsBlock}>
            <h3>Comments ({comments.filter((comment) => comment.text.length > 0).length})</h3>
            <p>Review this product</p>
            <form className={styles.commentsBlock__form} method='POST' onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.commentsBlock__form__rating}>
                    {[...Array(5)].map((_, index) => (
                        <button key={index} type='button' onClick={() => setRating(index + 1)}>
                            {index < rating ? <StarActiveIcon /> : <StarIcon />}
                        </button>
                    ))}
                </div>
                <textarea
                    name="comment"
                    id="comment"
                    placeholder='Enter your comment...'
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                <div className={styles.commentsBlock__form__bottom}>
                    <button type='submit' disabled={!rating && !comment}>Send</button>
                </div>
            </form>
        </div>
    )
}

export default PostComment