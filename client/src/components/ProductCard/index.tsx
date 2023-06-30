import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useMemo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useAppDispatch } from '@/redux/store';

//styles
import styles from './ProductCard.module.scss'
import 'react-lazy-load-image-component/src/effects/blur.css';

//icons
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as FavoriteActiveIcon } from '@/assets/icons/heart-filled.svg'

//components
import CardPrice from '../CardPrice';

//redux
import { wishListSelector } from '@/redux/wishList/selectors';
import { updateFavorite } from '@/redux/wishList/asyncActions';


interface IProductCardProps {
    _id: string,
    title: string,
    price: number,
    images: string[],
    discount: number,
    colors: string[]
}

const ProductCard: React.FC<IProductCardProps> = ({ _id, title, price, images, discount, colors }) => {
    const wishList = useSelector(wishListSelector);
    const dispatch = useAppDispatch();
    const isFavorite = wishList.find((obj) => obj._id === _id);

    const productLink = `/Sandrela/dresses/${_id}`; 

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
                    <Link to={productLink}>
                        <LazyLoadImage
                            effect="blur"
                            src={images[0]}
                            alt={title}
                        />
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
                            to={productLink}
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

export default ProductCard