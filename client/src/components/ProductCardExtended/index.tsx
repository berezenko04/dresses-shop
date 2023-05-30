import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useMemo } from 'react'

//styles
import styles from './ProductCardExtended.module.scss'

//icons
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as FavoriteActiveIcon } from '@/assets/icons/heart-filled.svg'

//components
import CardPrice from '../CardPrice';

//redux
import { isAuthSelector } from '@/redux/user/selectors';

//hooks
import useWishList from '@/hooks/useWishList';
import { wishListSelector } from '@/redux/wishList/selectors';
import { useAppDispatch } from '@/redux/store';
import { updateFavorite } from '@/redux/wishList/slice';


interface ProductCardExtendedProps {
    _id: string,
    title: string,
    price: number,
    images: string[],
    discount: number,
    colors: string[]
}

const ProductCardExtended: React.FC<ProductCardExtendedProps> = ({ _id, title, price, images, discount, colors }) => {
    const wishList = useSelector(wishListSelector);
    console.log(wishList);
    const dispatch = useAppDispatch();
    const isFavorite = wishList.find((obj) => obj._id === _id);

    const memoizedContent = useMemo(() => {
        return (
            <article className={styles.card}>
                <div className={styles.card__image}>
                    <button
                        className={styles.card__image__favorite}
                        onClick={() => dispatch(updateFavorite(_id))}
                    >
                        {isFavorite ? <FavoriteActiveIcon /> : <FavoriteIcon />}
                    </button>
                    <Link to={`/Sandrela/products/${_id}`}>
                        <img src={images[0]} alt="dress" />
                    </Link>
                    {discount !== 0 &&
                        <div className={styles.card__image__discount}>
                            {discount * 100}% off
                        </div>
                    }
                </div>
                <div className={styles.card__info}>
                    <div className={styles.card__info__head}>
                        <Link
                            to={`/Sandrela/products/${_id}`}
                            className={styles.card__info__head__title}>
                            {title}
                        </Link>
                        <p className={styles.card__info__head__colors}>
                            {colors.length} {colors.length > 1 ? 'colors' : 'color'}
                        </p>
                    </div>
                    <div className={styles.card__info__price}>
                        <CardPrice price={price} discount={discount} />
                    </div>
                </div>
            </article>
        );
    }, [isFavorite, _id, title, price, images, discount, colors]);

    return memoizedContent;
}

export default ProductCardExtended