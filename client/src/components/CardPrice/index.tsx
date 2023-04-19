import styles from './CardPrice.module.scss'

type CardPriceProps = {
    price: number,
    discount?: number
}

const CardPrice: React.FC<CardPriceProps> = ({ price, discount }) => {
    return (
        <div className={styles.price}>
            {discount ?
                <>
                    <p>{Math.round(price - (price * discount))} UAH</p>
                    <span>{price} UAH</span>
                </>
                :
                <p>{price} UAH</p>
            }
        </div>
    )
}

export default CardPrice