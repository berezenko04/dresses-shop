import { useEffect, useState } from 'react'

//styles
import styles from './MyReviews.module.scss'

//redux
import { Comment as TComment } from '@/redux/comments/types'

//API
import { getUserReviews } from '@/API/userService';

//Components
import Comment from '@/components/Comment';


const MyReviews: React.FC = () => {
    const [reviews, setReviews] = useState<TComment[]>();

    useEffect(() => {
        try {
            (async () => {
                const data = await getUserReviews();
                setReviews(data);
            })();
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div className={styles.reviews}>
            <h3>My reviews ({reviews && reviews.length})</h3>
            <div className={styles.reviews__main}>
                {reviews && reviews.map((review, index) => (
                    <div className={styles.reviews__main__item} key={index} >
                        <Comment {...review} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyReviews