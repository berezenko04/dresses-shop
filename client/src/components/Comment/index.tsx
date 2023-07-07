import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/store';

//styles
import styles from './Comment.module.scss'

//components
import CommentSkeleton from '../Skeletons/CommentSkeleton'

//icons
import { ReactComponent as StarActiveIcon } from '@/assets/icons/star.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star-empty.svg'
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg'
import { ReactComponent as DislikeIcon } from '@/assets/icons/dislike.svg'

//redux
import { TComment } from '@/redux/comments/types';
import { IUserData } from '@/redux/user/types'
import { dislikeComment, likeComment } from '@/redux/comments/asyncActions';
import { isAuthSelector, userDataSelector } from '@/redux/user/selectors'

//API
import { getUser } from '@/API/userService'
import { toast } from 'react-toastify';


const Comment: React.FC<TComment> = ({ _id, text, date, rating, likes, dislikes, user }) => {

    const [userData, setUserData] = useState<IUserData>();
    const dispatch = useAppDispatch();
    const isAuth = useSelector(isAuthSelector);
    const userId = useSelector(userDataSelector)?._id;

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data = await getUser(user);
            setUserData(data);
            setIsLoading(false);
        })();
    }, [])

    const handleAction = (variant: 'like' | 'dislike') => {
        if (isAuth) {
            if (_id) {
                variant === 'like' ? dispatch(likeComment(_id)) : dispatch(dislikeComment(_id));
            }
        } else {
            toast.error("Please login!");
        }
    }

    return (
        <>
            {isLoading ?
                <CommentSkeleton />
                :
                <div className={styles.comment}>
                    <div className={styles.comment__head}>
                        <div className={styles.comment__head__avatar}>
                            <img
                                src={userData?.avatarUrl}
                                alt='avatar'
                            />
                        </div>
                        <div className={styles.comment__head__rating}>
                            {rating !== 0 &&
                                <ul>
                                    {[...Array(5)].map((_, index) => (
                                        <li key={index}>{index < rating ? <StarActiveIcon /> : <StarIcon />}</li>
                                    ))}
                                </ul>
                            }
                            <p>{`${userData?.name} ${userData?.lastName}`}</p>
                        </div>
                    </div>
                    <p className={styles.comment__text}>{text}</p>
                    <div className={styles.comment__footer}>
                        <span>{date}</span>
                        <div className={styles.comment__footer__likes}>
                            <button
                                onClick={() => handleAction("like")}
                                className={userId && likes.includes(userId) ? styles.active : ''}
                            >
                                <LikeIcon />
                                {likes.length !== 0 ? likes.length : 0}
                            </button>
                            <button
                                onClick={() => handleAction("dislike")}
                                className={userId && dislikes.includes(userId) ? styles.active : ''}
                            >
                                <DislikeIcon />
                                {dislikes.length !== 0 ? dislikes.length : 0}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Comment