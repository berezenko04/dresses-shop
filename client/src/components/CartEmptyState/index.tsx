import { Link } from 'react-router-dom'

//styles
import styles from './CartEmptyState.module.scss'

//components
import Button from '../Button'

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
            <Link to={'/Sandrela/dresses'}>
                <Button size='sm' theme='primary'>Go shopping</Button>
            </Link>
        </div>
    )
}

export default CartEmptyState