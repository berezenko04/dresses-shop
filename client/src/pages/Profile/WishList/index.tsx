import { useSelector } from 'react-redux';

//styles
import styles from './WishList.module.scss'

//components
import ProductCardExtended from '@/components/ProductCardExtended';
import ProfileLayout from '@/layout/ProfileLayout';

//types
import { userDataSelector } from '@/redux/user/selectors';




const WishList: React.FC = () => {
    const data = useSelector(userDataSelector);

    return (
        <div className={styles.wishlist}>
            <ProfileLayout>
                <div className={styles.wishlist__wrapper}>
                    <h3>Wish List ({data?.wishList.length})</h3>
                    <div className={styles.wishlist__main}>
                        {data?.wishList.map((item, index) => (
                            <ProductCardExtended {...item} key={index} />
                        ))}
                    </div>
                </div>
            </ProfileLayout>
        </div>
    )
}

export default WishList