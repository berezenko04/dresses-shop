import { useSelector } from 'react-redux'
import { useState } from 'react';

//styles
import styles from './Checkout.module.scss'

//components
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';

//redux
import { authDataSelector } from '@/redux/auth/selectors'
import { TCartItem } from '@/redux/auth/types';

//utils
import { getTotalPrice } from '@/utils/getTotalPrice';

//icons
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg'
import { ReactComponent as InfoIcon } from '@/assets/icons/info.svg'



const Checkout: React.FC = () => {
    const data = useSelector(authDataSelector);
    const cartItems: TCartItem[] = data?.cart || [];
    const totalPrice = getTotalPrice(cartItems);
    const [billing, setBilling] = useState('');

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.page__wrapper}>
                    <h3>Checkout</h3>
                    <div className={styles.page__main}>
                        <div className={styles.page__main__left}>
                            <div className={styles.page__main__left__shipping}>
                                <div className={styles.page__main__left__shipping__head}>
                                    <h4>Shipping Address</h4>
                                    <button className={styles.edit}>Edit</button>
                                </div>
                                <ul className={styles.page__main__left__shipping__body}>
                                    <li>{data?.fullName}</li>
                                    <li>510 Kampong Bahru Rd Singapore 099446</li>
                                    <li>{data?.email}</li>
                                </ul>
                            </div>
                            <div className={styles.page__main__left__promo}>
                                <div className={styles.page__main__left__promo__head}>
                                    <h4>Redeem promo code</h4>
                                    <button><PlusIcon /></button>
                                </div>
                            </div>
                            <div className={styles.page__main__left__billing}>
                                <div className={styles.page__main__left__billing__head}>
                                    <h4>Shipping Address</h4>
                                    <button className={styles.edit}>Edit</button>
                                </div>
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
                            <Button theme='primary' size='lg' disabled={!billing}>Place order</Button>
                        </div>
                        <div className={styles.page__main__cart}>
                            <h3>Cart</h3>
                            <div className={styles.page__main__cart__items}>
                                {data?.cart.map((item, index) => (
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