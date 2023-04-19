import { Link } from 'react-router-dom'

//styles
import styles from './ProductCardExtended.module.scss'

import { ReactComponent as FavoriteIcon } from '@/assets/icons/favorite.svg'
import CardPrice from '../CardPrice';


interface ProductCardExtendedProps {
    _id: string,
    title: string,
    price: number,
    imageUrl: string,
    discount: number,
}

const ProductCardExtended: React.FC<ProductCardExtendedProps> = ({ _id, title, price, imageUrl, discount }) => {
    const id: string = _id;
    return (
        <Link to={`/Sandrela/products/${id}`}>
            <article className={styles.card} >
                <div className={styles.card__image}>
                    <button className={styles.favorite}><FavoriteIcon /></button>
                    <img src={imageUrl} alt="dress" />
                </div>
                <div className={styles.card__info}>
                    <p className={styles.card__info__title}>{title}</p>
                    <div className={styles.card__info__price}>
                        <CardPrice price={price} discount={discount} />
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default ProductCardExtended