import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

//styles
import styles from './ProductCardExtended.module.scss'

//API
import { addToWishList, removeFromWishList } from '@/API/userService';

//icons
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as FavoriteActiveIcon } from '@/assets/icons/heart-filled.svg'

//components
import CardPrice from '../CardPrice';

//redux
import { authDataSelector, isAuthSelector } from '@/redux/auth/selectors';
import { getProduct } from '@/API/dressesService';



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

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const getProductItem = async () => {
            const product = await getProduct(_id);
            return product;
        };

        const checkIsFavorite = async () => {
            const productItem = await getProductItem();
            setIsFavorite(
                data && data.wishList ? data.wishList.some((item) => item._id === productItem._id) : false
            );
        };

        checkIsFavorite();
    }, [data, _id]);


    const toggleFavorite = () => {

        if (!data) {
            toast.error('Failed to receive user data');
            return;
        }

        if (!isAuth) {
            toast.error('Please login!');
            return;
        }

        setIsFavorite(!isFavorite);

        isFavorite ? removeWish(data._id, _id) : addToWish(data?._id, _id);
    };



    const addToWish = async (userId: string, itemId: string) => {
        try {
            await addToWishList(userId, itemId);
        } catch (err) {
            console.log(err);
            toast.error('Failed to add product to favorites');
        }
    }



    const removeWish = async (itemId: string, userId: string) => {
        try {
            await removeFromWishList(itemId, userId);
        } catch (err) {
            console.log(err);
            toast.error('Failed to remove product from favorites');
        }
    }


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