//styles
import styles from './CartEmptyState.module.scss'

//icons
import { ReactComponent as CartIcon } from '@/assets/icons/cart-add.svg'

const CartEmptyState: React.FC = () => {
    return (
        <div className={styles.empty}>
            <CartIcon />
            <div className={styles.empty__text}>
                <p>You haven't added anything to your cart yet</p>
                <p>Add an item to your shopping cart and it will appear in this list.</p>
            </div>
        </div>
    )
}

export default CartEmptyState