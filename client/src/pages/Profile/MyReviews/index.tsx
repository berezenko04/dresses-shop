import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/store'

//styles
import styles from './MyReviews.module.scss'

//components
import Comment from '@/components/Comment'
import ProfileLayout from '@/layout/ProfileLayout'
import CommentSkeleton from '@/components/Skeletons/CommentSkeleton'
import Pagination from '@/components/Pagination'

//redux
import { myReviewsSelector } from '@/redux/myReviews/selectors'
import { fetchMyReviews } from '@/redux/myReviews/asyncActions'


const MyReviews: React.FC = () => {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const limit = isMobile ? 6 : 8;
    const { items, status, length } = useSelector(myReviewsSelector);
    const pageCount = Math.ceil(length / limit);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    useEffect(() => {
        dispatch(fetchMyReviews({ page, limit }));
    }, [page, limit])

    return (
        <div className={styles.reviews}>
            <ProfileLayout>
                <div className={styles.reviews__wrapper}>
                    <h3>My reviews ({length ? length : 0})</h3>
                    <div className={styles.reviews__main}>
                        {status !== 'loading' ?
                            items.map((review, index) => (
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