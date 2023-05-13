import { useSelector } from 'react-redux'

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


const Checkout: React.FC = () => {
    const data = useSelector(authDataSelector);
    const cartItems: TCartItem[] = data?.cart || [];
    const totalPrice = getTotalPrice(cartItems);

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.page__wrapper}>
                    <h3>Checkout</h3>
                    <div className={styles.page__main}>
                        <div className={styles.page__main__left}>
                            <div className={styles.page__main__left__block}>

                            </div>
                            <div className={styles.page__main__left__block}>

                            </div>
                            <div className={styles.page__main__left__block}>

                            </div>
                            <Button theme='primary' size='lg'>Place order</Button>
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