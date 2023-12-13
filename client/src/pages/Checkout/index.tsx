import { useSelector } from 'react-redux'
import { useState } from 'react';

//styles
import styles from './Checkout.module.scss'

//components
import CartItem from '@/components/CartItem';
import ShippingInfo from '@/components/ShippingInfo';
import CartEmptyState from '@/components/CartEmptyState';
import TotalPrice from '@/components/TotalPrice';
import CreditCardForm from '@/components/Forms/CreditCardForm';
import MetaHead from '@/components/MetaHead';

//redux
import { cartSelector } from '@/redux/cart/selectors';

//icons
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg'



const Checkout: React.FC = () => {
    const { cartItems } = useSelector(cartSelector);
    const [readableCart, setReadableCart] = useState(true);
    const cartEmpty = cartItems.length <= 0;

    return (
        <div className={styles.page}>
            <MetaHead
                title='Checkout'
                desc="Complete your purchase and experience the wonder of Sandrela's enchanting and extraordinary products and services."
            />
            <div className="container">
                <div className={styles.page__wrapper}>
                    <h3>Checkout</h3>
                    <div className={styles.page__main}>
                        <div className={styles.page__main__left}>
                            <ShippingInfo editable />
                            {!cartEmpty &&
                                <div className={styles.page__main__left__promo}>
                                    <div className={styles.page__main__left__promo__head}>
                                        <h4>Redeem promo code</h4>
                                        <button><PlusIcon /></button>
                                    </div>
                                </div>
                            }
                            {!cartEmpty &&
                                <div className={styles.page__main__left__billing}>
                                    <h4>Billing Address</h4>
                                    <CreditCardForm />
                                </div>
                            }
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
                            {!cartEmpty ?
                                <div className={styles.page__main__cart__items}>
                                    {cartItems.map((item, index) => (
                                        <CartItem readable={readableCart} cart={item} key={index} />
                                    ))}
                                </div>
                                :
                                <div className={styles.page__main__cart__empty}>
                                    <CartEmptyState />
                                </div> 
                            }

                            {!cartEmpty &&
                                <TotalPrice discount={0} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout