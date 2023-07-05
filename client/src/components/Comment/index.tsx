import { useEffect, useState } from 'react'

//styles
import styles from './Comment.module.scss'

//icons
import { ReactComponent as StarActiveIcon } from '@/assets/icons/star.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star-empty.svg'
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg'
import { ReactComponent as DislikeIcon } from '@/assets/icons/dislike.svg'

//redux
import { TComment } from '@/redux/comments/types';
import { IUserData } from '@/redux/user/types'
import { useAppDispatch } from '@/redux/store';
import { dislikeComment, likeComment } from '@/redux/comments/asyncActions';

//API
import { getUser } from '@/API/userService'
import CommentSkeleton from '../Skeletons/CommentSkeleton'


const Comment: React.FC<TComment> = ({ _id, text, date, rating, likes, dislikes, user }) => {

    const [userData, setUserData] = useState<IUserData>();

    const dispatch = useAppDispatch();
    const userId = userData?._id || '';
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data = await getUser(user);
            setUserData(data);
            setIsLoading(false);
        })();
    }, [])

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
                                onClick={() => _id && dispatch(likeComment(_id))}
                                className={likes.includes(userId) ? styles.active : ''}
                            >
                                <LikeIcon />
                                {likes.length !== 0 ? likes.length : 0}
                            </button>
                            <button
                                onClick={() => _id && dispatch(dislikeComment(_id))}
                                className={dislikes.includes(userId) ? styles.active : ''}
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