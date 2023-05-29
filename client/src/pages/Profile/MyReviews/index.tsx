import { useEffect, useState } from 'react'

//styles
import styles from './MyReviews.module.scss'

//redux
import { Comment as TComment } from '@/redux/comments/types'

//API
import { getUserReviews } from '@/API/userService';

//components
import Comment from '@/components/Comment';
import ProfileLayout from '@/layout/ProfileLayout';
import CommentSkeleton from '@/components/Skeletons/CommentSkeleton';


const MyReviews: React.FC = () => {
    const [reviews, setReviews] = useState<TComment[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            setLoading(true);
            (async () => {
                const data = await getUserReviews();
                setReviews(data);
                setLoading(false);
            })();
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div className={styles.reviews}>
            <ProfileLayout>
                <div className={styles.reviews__wrapper}>
                    <h3>My reviews ({reviews && reviews.length})</h3>
                    <div className={styles.reviews__main}>
                        {loading ?
                            [...Array(5)].map((_, index) => (
                                <CommentSkeleton key={index} />
                            ))
                            :
                            reviews && reviews.map((review, index) => (
                                <div className={styles.reviews__main__item} key={index} >
                                    <Comment {...review} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </ProfileLayout>
        </div>
    )
}

export default MyReviews