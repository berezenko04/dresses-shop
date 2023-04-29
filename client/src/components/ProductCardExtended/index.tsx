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
    colors: string[]
}

const ProductCardExtended: React.FC<ProductCardExtendedProps> = ({ _id, title, price, imageUrl, discount, colors }) => {
    return (
        <Link to={`/Sandrela/products/${_id}`}>
            <article className={styles.card} >
                <div className={styles.card__image}>
                    <button className={styles.card__image__favorite}><FavoriteIcon /></button>
                    <img src={imageUrl} alt="dress" />
                    {discount !== 0 && <div className={styles.card__image__discount}>{discount * 100}% off</div>}
                </div>
                <div className={styles.card__info}>
                    <div className={styles.card__info__head}>
                        <p className={styles.card__info__head__title}>{title}</p>
                        <p className={styles.card__info__head__colors}>{colors.length} {colors.length > 1 ? 'colors' : 'color'}</p>
                    </div>
                    <div className={styles.card__info__price}>
                        <CardPrice price={price} discount={discount} />
                    </div>
                </div>
            </article>
        </Link >
    )
}

export default ProductCardExtended