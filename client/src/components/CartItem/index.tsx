import { useState } from 'react'

//styles
import styles from './CartItem.module.scss'

//components
import CardPrice from '../CardPrice'

//icons
import { ReactComponent as MinusIcon } from '@/assets/icons/minus.svg'
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg'
import { ReactComponent as TrashIcon } from '@/assets/icons/trash.svg'

//types
import { ProductItem } from '@/redux/products/types'


type CartItemProps = {
    cart: ProductItem
}


const CartItem: React.FC<CartItemProps> = ({ cart }) => {
    const { imageUrl, title, discount, price } = cart;

    const [quantity, setQuantity] = useState(0);

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
                    <p>Size: </p>
                    <div className={styles.item__content__info__quantity}>
                        <p>Quantity:</p>
                        <div className={styles.item__content__info__quantity__field}>
                            <button disabled={quantity === 0} onClick={() => setQuantity(quantity - 1)}><MinusIcon /></button>
                            <span>{quantity}</span>
                            <button disabled={quantity === 10} onClick={() => setQuantity(quantity + 1)}><PlusIcon /></button>
                        </div>
                    </div>
                </div>
                <button className={styles.item__content__remove}>
                    <TrashIcon />
                    Remove
                </button>
            </div>
        </article>
    )
}

export default CartItem