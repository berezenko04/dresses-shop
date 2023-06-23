import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

//styles
import styles from './MyReviews.module.scss'

//components
import Comment from '@/components/Comment'
import ProfileLayout from '@/layout/ProfileLayout'
import CommentSkeleton from '@/components/Skeletons/CommentSkeleton'
import Pagination from '@/components/Pagination'

//redux
import { TComment } from '@/redux/comments/types'

//service
import { getUserReviews } from '@/API/userService'

const MyReviews: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState<TComment[]>();
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState(1);
    const limit = isMobile ? 6 : 8;
    const pageCount = Math.ceil(count / limit);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data = await getUserReviews(page, limit);
            setReviews(data.comments);
            setCount(data.length);
        })();
        setIsLoading(false);
    }, [reviews]);

    return (
        <div className={styles.reviews}>
            <ProfileLayout>
                <div className={styles.reviews__wrapper}>
                    <h3>My reviews ({count})</h3>
                    <div className={styles.reviews__main}>
                        {!isLoading ?
                            reviews && reviews.map((review, index) => (
                                <div className={styles.reviews__main__item} key={index} >
                                    <Comment {...review} />
                                </div>
                            ))
                            :
                            [...Array(5)].map((_, index) => (
                                <CommentSkeleton key={index} />
                            ))
                        }
                    </div>
                    {pageCount > 1 && <Pagination pageCount={pageCount} limit={limit} onPageChange={handlePageChange} />}
                </div>
            </ProfileLayout>
        </div>
    )
}

export default MyReviews