import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

//styles
import styles from './ProductCardExtended.module.scss'

//icons
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as FavoriteActiveIcon } from '@/assets/icons/heart-filled.svg'

//components
import CardPrice from '../CardPrice';

//redux
import { isAuthSelector } from '@/redux/auth/selectors';

//hooks
import useWishList from '@/hooks/useWishList';


interface ProductCardExtendedProps {
    _id: string,
    title: string,
    price: number,
    imageUrl: string,
    discount: number,
    colors: string[]
}

const ProductCardExtended: React.FC<ProductCardExtendedProps> = ({ _id, title, price, imageUrl, discount, colors }) => {
    const isAuth = useSelector(isAuthSelector);
    const { isFavorite, toggleFavorite } = useWishList(_id, isAuth);

    return (
        <article className={styles.card} >
            <div className={styles.card__image}>
                <button
                    className={styles.card__image__favorite}
                    onClick={toggleFavorite}
                >
                    {isFavorite ? <FavoriteActiveIcon /> : <FavoriteIcon />}
                </button>
                <Link to={`/Sandrela/products/${_id}`}>
                    <img src={imageUrl} alt="dress" />
                </Link >
                {discount !== 0 && <div className={styles.card__image__discount}>{discount * 100}% off</div>}
            </div>
            <div className={styles.card__info}>
                <div className={styles.card__info__head}>
                    <Link
                        to={`/Sandrela/products/${_id}`}
                        className={styles.card__info__head__title}>
                        {title}
                    </Link>
                    <p className={styles.card__info__head__colors}>{colors.length} {colors.length > 1 ? 'colors' : 'color'}</p>
                </div>
                <div className={styles.card__info__price}>
                    <CardPrice price={price} discount={discount} />
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme="light"
            />
        </article>
    )
}

export default ProductCardExtended