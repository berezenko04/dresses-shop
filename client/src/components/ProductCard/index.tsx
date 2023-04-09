import { Link } from 'react-router-dom'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
    title: string,
    price: number,
    imageUrl: string,
    _id: string
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, imageUrl, _id }) => {
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

export default ProductCard