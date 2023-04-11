import { Link } from 'react-router-dom'

//styles
import styles from './ProductCardExtended.module.scss'

import { ReactComponent as FavoriteIcon } from '@/assets/icons/favorite.svg'


interface ProductCardExtendedProps {
    _id: string,
    title: string,
    price: number,
    imageUrl: string,
    discount: number,
}

const ProductCardExtended: React.FC<ProductCardExtendedProps> = ({ _id, title, price, imageUrl, discount }) => {
    return (
        <Link to={`/Sandrela/products/${_id}`}>
            <article className={styles.card} >
                <div className={styles.card__image}>
                    <button className={styles.favorite}><FavoriteIcon /></button>
                    <img src={imageUrl} alt="dress" />
                </div>
                <div className={styles.card__info}>
                    <p className={styles.card__info__title}>{title}</p>
                    <div className={styles.card__info__price}>
                        {discount ?
                            <>
                                <p>{Math.round(price - (price * discount))} UAH</p>
                                <span>{price} UAH</span>
                            </>
                            :
                            <p>{price} UAH</p>
                        }
                    </div>
                </div>
            </article >
        </Link>
    )
}

export default ProductCardExtended