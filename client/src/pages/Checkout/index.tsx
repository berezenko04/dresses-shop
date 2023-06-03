import { useSelector } from 'react-redux'
import { useState } from 'react';

//styles
import styles from './Checkout.module.scss'

//components
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import ShippingInfo from '@/components/ShippingInfo';
import Radio from '@/components/Radio';
import AuthField from '@/components/AuthField';

//redux
import { cartSelector, cartTotalPrice } from '@/redux/cart/selectors';

//icons
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg'
import { ReactComponent as PaypalIcon } from '@/assets/icons/paypal.svg'
import { ReactComponent as MCIcon } from '@/assets/icons/mastercard.svg'
import { ReactComponent as VisaIcon } from '@/assets/icons/visa.svg'
import CartEmptyState from '@/components/CartEmptyState';


const Checkout: React.FC = () => {
    const cartItems = useSelector(cartSelector);
    const totalPrice = useSelector(cartTotalPrice);
    const [discount, setDiscount] = useState(0);
    const [payment, setPayment] = useState('paypal');
    const [readableCart, setReadableCart] = useState(true);

    const cartEmpty = cartItems.length <= 0;
    const deliveryPrice = 1200;

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
                                    <label className={styles.page__main__left__billing__body__item}>
                                        <Radio
                                            title='Paypal'
                                            name='billing'
                                            defaultChecked
                                            onChange={() => setPayment('paypal')}
                                        />
                                        <PaypalIcon />
                                    </label>
                                    <label className={styles.page__main__left__billing__body__item}>
                                        <Radio
                                            title='Credit card'
                                            name='billing'
                                            onChange={() => setPayment('card')}
                                        />
                                        <div>
                                            <MCIcon />
                                            <VisaIcon />
                                        </div>
                                    </label>
                                </div>
                                <form className={styles.page__main__left__billing__form}>
                                    {payment === 'paypal' ?
                                        <div className={styles.page__main__left__billing__form__block}>
                                            <AuthField title='Paypal Address' error={false} />
                                        </div>

                                        :
                                        <>
                                            <div className={styles.page__main__left__billing__form__block}>
                                                <AuthField title='Full Name' error={false} />
                                            </div>
                                            <div className={styles.page__main__left__billing__form__block}>
                                                <AuthField title='Card Number' error={false} />
                                            </div>
                                            <div className={styles.page__main__left__billing__form__footer}>
                                                <div className={styles.page__main__left__billing__form__block}>
                                                    <AuthField title='Expiration Date' error={false} />
                                                </div>
                                                <div className={styles.page__main__left__billing__form__block}>
                                                    <AuthField title='CVV Number' error={false} />
                                                </div>
                                            </div>
                                        </>
                                    }




                                </form>
                            </div>
                            <Button theme='primary' size='lg'>Place order</Button>
                        </div>
                        <div className={styles.page__main__cart}>
                            <div className={styles.page__main__cart__head}>
                                <h3>Cart</h3>
                                {!cartEmpty &&
                                    <button onClick={() => setReadableCart(!readableCart)}>
                                        {readableCart ? 'Edit' : 'Cancel'}
                                    </button>
                                }
                            </div>
                            <div className={styles.page__main__cart__items}>
                                {!cartEmpty ?
                                    cartItems.map((item, index) => (
                                        <CartItem readable={readableCart} cart={item} key={index} />
                                    ))
                                    :
                                    <CartEmptyState />
                                }
                            </div>
                            {!cartEmpty &&
                                <ul className={styles.page__main__cart__total}>
                                    <li>
                                        <p>Total</p>
                                        <span>{totalPrice} UAH</span>
                                    </li>
                                    {discount !== 0 &&
                                        <li>
                                            <p>Discount</p>
                                            <span>{discount * 100}%</span>
                                        </li>
                                    }
                                    <li>
                                        <p>Delivery</p>
                                        <span>{deliveryPrice} UAH</span>
                                    </li>
                                    <li>
                                        <p>Grand Total</p>
                                        <span>{(totalPrice + deliveryPrice) - (totalPrice * discount)} UAH</span>
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout