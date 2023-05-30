import { useSelector } from 'react-redux';

//styles
import styles from './WishList.module.scss'

//components
import ProductCardExtended from '@/components/ProductCardExtended';
import ProfileLayout from '@/layout/ProfileLayout';

//types
import { wishListSelector } from '@/redux/wishList/selectors';




const WishList: React.FC = () => {
    const wishList = useSelector(wishListSelector);

    return (
        <div className={styles.wishlist}>
            <ProfileLayout>
                <div className={styles.wishlist__wrapper}>
                    <h3>Wish List ({wishList.length})</h3>
                    <div className={styles.wishlist__main}>
                        {wishList.map((item, index) => (
                            <ProductCardExtended {...item} key={index} />
                        ))}
                    </div>
                </div>
            </ProfileLayout>
        </div>
    )
}

export default WishList