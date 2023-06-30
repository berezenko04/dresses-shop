import { Link } from 'react-router-dom'

//styles
import styles from './ProductCardSmall.module.scss'

//redux
import { TProductItem } from '@/redux/products/types'

interface ProductCardSmallProps {
    _id: string,
    title: string,
    price: number,
    imageUrl: string,
    discount: number
}

const ProductCardSmall: React.FC<TProductItem> = ({ _id, title, price, images, discount }) => {
    const link = `/Sandrela/dresses/${_id}`;

    return (
        <article className={styles.card}>
            <Link to={link} className={styles.card__image}>
                <img src={images[0]} alt="dress" />
            </Link>
            <div className={styles.card__info}>
                <Link to={link}>
                    <p>{title}</p>
                </Link>
                <span>{Math.ceil(price * (1 - discount))} UAH</span>
            </div>
        </article >
    )
}

export default ProductCardSmall