import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';

//styles
import styles from './WishList.module.scss'

//components
import ProductCardExtended from '@/components/ProductCardExtended';
import ProfileLayout from '@/layout/ProfileLayout';

//redux
import { wishListSelector, wishListStatusSelector } from '@/redux/wishList/selectors';
import { fetchWishList } from '@/redux/wishList/asyncActions';
import ProductCardSkeleton from '@/components/Skeletons/ProductCardSkeleton';


const WishList: React.FC = () => {
    const wishList = useSelector(wishListSelector);
    const dispatch = useAppDispatch();
    const status = useSelector(wishListStatusSelector);

    useEffect(() => {
        dispatch(fetchWishList());
    }, [])

    return (
        <div className={styles.wishlist}>
            <ProfileLayout>
                <div className={styles.wishlist__wrapper}>
                    <h3>Wish List ({wishList.length})</h3>
                    <div className={styles.wishlist__main}>
                        {status === 'success' ?
                            wishList.map((item, index) => (
                                <ProductCardExtended {...item} key={index} />
                            ))
                            :
                            [...Array(6)].map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))
                        }
                    </div>
                </div>
            </ProfileLayout>
        </div>
    )
}

export default WishList