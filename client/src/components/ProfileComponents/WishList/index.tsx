//styles
import styles from './WishList.module.scss'

//components
import ProductCardExtended from '@/components/ProductCardExtended';

//types
import { ProductItem } from '@/redux/products/types';

type WishListProps = {
    wishList: ProductItem[]
}

const WishList: React.FC<WishListProps> = ({ wishList }) => {
    return (
        <div className={styles.wishlist}>
            <h3>Wish List ({wishList.length})</h3>
            <div className={styles.wishlist__main}>
                {wishList.map((item, index) => (
                    <ProductCardExtended {...item} key={index} />
                ))}
            </div>
        </div>
    )
}

export default WishList