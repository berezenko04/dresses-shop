import { useSelector } from 'react-redux'
import { useEffect } from 'react'

//styles
import styles from './CartOverlay.module.scss'

//components
import CartItem from '../CartItem'
import Button from '../Button'

//icons
import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg'

//redux
import { authDataSelector } from '@/redux/auth/selectors'
import { useAppDispatch } from '@/redux/store'
import { fetchProduct } from '@/redux/products/asyncActions'
import { getPriceWithDiscount } from '@/utils/getPriceWithDiscount'


type CartOverlayProps = {
    handleOverlayClick: () => void
}

const CartOverlay: React.FC<CartOverlayProps> = ({ handleOverlayClick }) => {

    const data = useSelector(authDataSelector);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.overlay}>
            <div className={styles.overlay__head}>
                <h3>Cart ({data?.cart.length})</h3>
                <button onClick={handleOverlayClick}><CloseIcon /></button>
            </div>
            <div className={styles.overlay__items}>
                {data?.cart.map((cartItem, index) => (
                    data.cart.length > 0 && <CartItem cart={cartItem} key={index} />
                ))}
            </div>
            <div className={styles.overlay__checkout}>
                <div className={styles.overlay__checkout__total}>
                    <h4>Total</h4>
                    <p>{data?.cart.reduce((acc, item) => acc + getPriceWithDiscount(item.price, item.discount), 0)} UAH</p>
                </div>
                <Button theme='primary' size='sm'>Checkout</Button>
            </div>
        </div >
    )
}

export default CartOverlay