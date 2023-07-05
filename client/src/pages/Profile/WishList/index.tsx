import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

//styles
import styles from './WishList.module.scss'

//components
import ProductCardExtended from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/Skeletons/ProductCardSkeleton';
import ProfileLayout from '@/layout/ProfileLayout';
import Pagination from '@/components/Pagination';
import EmptyState from '@/components/EmptyState';

//redux
import { wishListLengthSelector, wishListSelector, wishListStatusSelector } from '@/redux/wishList/selectors';
import { fetchWishList } from '@/redux/wishList/asyncActions';



const WishList: React.FC = () => {
    const [page, setPage] = useState(1);
    const wishList = useSelector(wishListSelector);
    const dispatch = useAppDispatch();
    const status = useSelector(wishListStatusSelector);
    const wishListCount = useSelector(wishListLengthSelector);
    const limit = isMobile ? 6 : 9;
    const pageCount = Math.ceil(wishListCount / limit);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    useEffect(() => {
        dispatch(fetchWishList({ page, limit }));
    }, [page])

    return (
        <div className={styles.wishlist}>
            <ProfileLayout>
                <div className={styles.wishlist__wrapper}>
                    <h3>Wish List ({wishListCount})</h3>
                    {!wishList.length && status === 'success' ?
                        <div className={styles.wishList__main__empty}>
                            <EmptyState
                                title={"You haven't added anything to your wishlist yet"}
                                text={'Your wishlist is empty. Start adding items you love!'}
                            />
                        </div>
                        :
                        <div className={styles.wishlist__main}>
                            {status === 'success' ?
                                wishList.map((item, index) => (
                                    <ProductCardExtended {...item} key={index} />
                                ))
                                :
                                [...Array(6)].map((_, index) => (
                                    <ProductCardSkeleton key={index} />
                                ))}
                        </div>
                    }
                    <Pagination limit={limit} pageCount={pageCount} onPageChange={handlePageChange} />
                </div>
            </ProfileLayout>
        </div>
    )
}

export default WishList