import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';

//styles
import styles from './ProductCardExtended.module.scss'

//API
import { addToWishList } from '@/API/userService';

//icons
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as FavoriteActiveIcon } from '@/assets/icons/heart-filled.svg'

//components
import CardPrice from '../CardPrice';

//redux
import { authDataSelector, isAuthSelector } from '@/redux/auth/selectors';



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
    const data = useSelector(authDataSelector);
    const navigate = useNavigate();

    const [favorite, setFavorite] = useState(false);

    const handleFavoriteClick = () => {
        if (!isAuth) {
            navigate('/Sandrela/login');
        }

        if (!data) {
            alert('Failed to get user data');
            return null;
        }

        setFavorite(!favorite);

        console.log(favorite);
        if (favorite) {
            console.log('qqqqq');
            addToWish(_id, data._id);
        } else {

        }
    }

    const addToWish = async (itemId: string, userId: string) => {
        try {
            await addToWishList(itemId, userId);
        } catch (err) {
            console.log(err);
            alert('Failed to add product to favorites');
        }
    }

    return (
        <article className={styles.card} >
            <div className={styles.card__image}>
                <button
                    className={styles.card__image__favorite}
                    onClick={handleFavoriteClick}
                >
                    {favorite ? <FavoriteActiveIcon /> : <FavoriteIcon />}
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
        </article>

    )
}

export default ProductCardExtended