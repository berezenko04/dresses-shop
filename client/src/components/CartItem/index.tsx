import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/store'

//styles
import styles from './CartItem.module.scss'

//components
import CardPrice from '../CardPrice'

//icons
import { ReactComponent as MinusIcon } from '@/assets/icons/minus.svg'
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg'
import { ReactComponent as TrashIcon } from '@/assets/icons/trash.svg'

//redux
import { TCartItem } from '@/redux/auth/types'
import { authDataSelector } from '@/redux/auth/selectors'

//API
import { removeFromCart } from '@/API/userService'
import { deleteFromCart } from '@/redux/auth/slice'



type CartItemProps = {
    cart: TCartItem,
    readable?: boolean
}


const CartItem: React.FC<CartItemProps> = ({ cart, readable = false }) => {
    const dispatch = useAppDispatch();
    const { imageUrl, title, discount, price, size, _id } = cart;

    const [quantity, setQuantity] = useState(1);

    const handleRemove = async () => {
        try {
            dispatch(deleteFromCart(_id));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <article className={styles.item}>
            <div className={styles.item__image}>
                <img src={imageUrl} alt={title} />
            </div>
            <div className={styles.item__content}>
                <div className={styles.item__content__main}>
                    <h4>{title}</h4>
                    <CardPrice price={price} discount={discount} />
                    {discount !== 0 && <span>{discount * 100}% off</span>}
                </div>
                <div className={styles.item__content__info}>
                    <p>Size: {size}</p>
                    <div className={styles.item__content__info__quantity}>
                        <p>Quantity:</p>
                        {readable ?
                            <span>{quantity}</span>
                            :
                            <div className={styles.item__content__info__quantity__field}>
                                <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}><MinusIcon /></button>
                                <span>{quantity}</span>
                                <button disabled={quantity === 10} onClick={() => setQuantity(quantity + 1)}><PlusIcon /></button>
                            </div>
                        }
                    </div>
                </div>
                {!readable &&
                    <button className={styles.item__content__remove} onClick={handleRemove}>
                        <TrashIcon />
                        Remove
                    </button>
                }
            </div>
        </article>
    )
}

export default CartItem