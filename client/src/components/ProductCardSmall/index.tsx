import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

//styles
import styles from './ProductCardSmall.module.scss'
import 'react-lazy-load-image-component/src/effects/blur.css';

//redux
import { TProductItem } from '@/redux/products/types'


const ProductCardSmall: React.FC<TProductItem> = ({ _id, title, price, images, discount }) => {
    const link = `/dresses/${_id}`;

    return (
        <article className={styles.card}>
            <Link to={link} className={styles.card__image}>
                <LazyLoadImage
                    effect="blur"
                    src={images[0]}
                    alt={title}
                />
            </Link>
            <div className={styles.card__info}>
                <Link to={link}>
                    <p>{title}</p>
                </Link>
                <span>{Math.ceil(price * (1 - discount))} UAH</span>
            </div>
        </article>
    )
}

export default ProductCardSmall