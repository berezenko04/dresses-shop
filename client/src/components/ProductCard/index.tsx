import styles from './ProductCard.module.scss'

interface ProductCardProps {
    title: string,
    price: number,
    imageUrl: string
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, imageUrl }) => {
    return (
        <article className={styles.card}>
            <div className={styles.card__image}>
                <img src={imageUrl} alt="dress" />
            </div>
            <div className={styles.card__info}>
                <p>{title}</p>
                <span>{price} UAH</span>
            </div>
        </article>
    )
}

export default ProductCard