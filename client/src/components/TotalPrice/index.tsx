import { useSelector } from 'react-redux';

//styles
import styles from './TotalPrice.module.scss'

//redux
import { cartSelector } from '@/redux/cart/selectors';

type TTotalPriceProps = {
    discount: number
}

const TotalPrice: React.FC<TTotalPriceProps> = ({ discount }) => {
    const { totalPrice } = useSelector(cartSelector);
    const deliveryPrice = 1200;

    return (
        <ul className={styles.total}>
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
    )
}

export default TotalPrice