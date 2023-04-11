import { Link } from 'react-router-dom'
import styles from './ProductCardDefault.module.scss'

interface ProductCardDefaultProps {
    _id: string,
    title: string,
    price: number,
    imageUrl: string,
    discount: number
}

const ProductCardDefault: React.FC<ProductCardDefaultProps> = ({ _id, title, price, imageUrl }) => {
    return (
        <Link to={`/Sandrela/products/${_id}`}>
            <article className={styles.card} >
                <div className={styles.card__image}>
                    <img src={imageUrl} alt="dress" />
                </div>
                <div className={styles.card__info}>
                    <p>{title}</p>
                    <span>{price} UAH</span>
                </div>
            </article >
        </Link>
    )
}

export default ProductCardDefault