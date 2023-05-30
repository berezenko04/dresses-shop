import { useSelector } from 'react-redux'

//styles
import styles from './Checkout.module.scss'

//components
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import ShippingInfo from '@/components/ShippingInfo';

//redux
import { cartSelector, cartTotalPrice } from '@/redux/cart/selectors';

//icons
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg'
import { ReactComponent as InfoIcon } from '@/assets/icons/info.svg'



const Checkout: React.FC = () => {
    const cartItems = useSelector(cartSelector);
    const totalPrice = useSelector(cartTotalPrice);

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.page__wrapper}>
                    <h3>Checkout</h3>
                    <div className={styles.page__main}>
                        <div className={styles.page__main__left}>
                            <ShippingInfo editable />
                            <div className={styles.page__main__left__promo}>
                                <div className={styles.page__main__left__promo__head}>
                                    <h4>Redeem promo code</h4>
                                    <button><PlusIcon /></button>
                                </div>
                            </div>
                            <div className={styles.page__main__left__billing}>
                                <h4>Billing Address</h4>
                                <div className={styles.page__main__left__billing__body}>
                                    <div className={styles.page__main__left__billing__body__item}>
                                        <input type="radio" name='billing' id='paypal' />
                                        <label htmlFor="paypal">Paypal</label>
                                        <InfoIcon />
                                    </div>
                                    <div className={styles.page__main__left__billing__body__item}>
                                        <input type="radio" name='billing' id='card' />
                                        <label htmlFor="card">Credit card</label>
                                        <InfoIcon />
                                    </div>
                                </div>
                            </div>
                            <Button theme='primary' size='lg'>Place order</Button>
                        </div>
                        <div className={styles.page__main__cart}>
                            <h3>Cart</h3>
                            <div className={styles.page__main__cart__items}>
                                {cartItems.map((item, index) => (
                                    <CartItem readable={true} cart={item} key={index} />
                                ))}
                            </div>
                            <div className={styles.page__main__cart__total}>
                                <h4>Total</h4>
                                <p>{totalPrice + " UAH"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout