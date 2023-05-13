import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

//styles
import styles from './Product.module.scss'

//components
import CardPrice from '@/components/CardPrice';
import Colors from '@/components/Colors';
import Comment from '@/components/Comment';
import Button from '@/components/Button';

//Array
import { sizes } from '../Products';

//redux
import { useAppDispatch } from '@/redux/store';
import { fetchProduct } from '@/redux/products/asyncActions';
import { productsSelector } from '@/redux/products/selectors';
import { fetchComments } from '@/redux/comments/asyncActions';
import { commentsItemsSelector } from '@/redux/comments/selectors';
import { authDataSelector, isAuthSelector } from '@/redux/auth/selectors';

//icons
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as FavoriteActiveIcon } from '@/assets/icons/heart-filled.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star.svg'

//hooks
import useWishList from '@/hooks/useWishList';

//API
import { addToCart } from '@/API/userService';


const Product: React.FC = () => {

    const [comment, setComment] = useState("");
    const [selectedSize, setSelectedSize] = useState('xxs');

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const product = useSelector(productsSelector);
    const isAuth = useSelector(isAuthSelector);
    const data = useSelector(authDataSelector);
    const comments = useSelector(commentsItemsSelector);

    const isAvailable = product[0]?.stock;

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(id));
            dispatch(fetchComments(id));
        }
    }, [])

    const { isFavorite, toggleFavorite } = useWishList(id || '', isAuth);


    const handleAddClick = async () => {
        try {
            if (data?._id) {
                await addToCart({
                    item: {
                        _id: product[0]?._id,
                        title: product[0]?.title,
                        price: product[0]?.price,
                        discount: product[0]?.discount,
                        size: selectedSize,
                        quantity: 1,
                        imageUrl: product[0]?.imageUrl
                    },
                    userId: data._id
                });
                toast.success('Item added to cart');
            } else {
                toast.error('Please login!');
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.page__wrapper}>
                    <div className={styles.page__product}>
                        <div className={styles.page__product__left}>
                            <div className={styles.page__product__left__images}>
                                {[...Array(4)].map((_, index) => (
                                    <div className={styles.page__product__left__images__item} key={index}>
                                        <img src={product[0]?.imageUrl} alt={product[0]?.title} />
                                    </div>
                                ))}
                            </div>
                            <div className={styles.page__product__left__banner}>
                                <img src={product[0]?.imageUrl} alt={product[0]?.title} />
                            </div>
                        </div>
                        <div className={styles.page__product__right}>
                            <div className={styles.page__product__right__wrapper}>
                                <div className={styles.page__product__right__head}>
                                    <span className={isAvailable ? styles.available : styles.out}>
                                        {isAvailable ? 'Are available' : 'Out of stock'}
                                    </span>
                                    <h3>{product[0]?.title}</h3>
                                    <div className={styles.page__product__right__head__price}>
                                        <CardPrice price={product[0]?.price} discount={product[0]?.discount} />
                                    </div>
                                    {product[0]?.discount > 0 &&
                                        <span className={styles.page__product__right__head__discount}>
                                            {product[0]?.discount * 100}% off
                                        </span>
                                    }
                                </div>
                                <Colors colors={product[0]?.colors} />
                                <p className='regular'>{product[0]?.desc}</p>
                                <div className={styles.page__product__right__sizes}>
                                    <div className={styles.page__product__right__sizes__head}>
                                        <p className='regular-uppercase'>Select Size</p>
                                        <Link to="">Size Guide</Link>
                                    </div>
                                    <ul className={styles.page__product__right__sizes__list}>
                                        {sizes.map((size, index) => (
                                            <li key={index}>
                                                <input
                                                    type="radio"
                                                    name='size'
                                                    id={size}
                                                    defaultChecked={index === 0}
                                                    disabled={product[0]?.sizes && !product[0]?.sizes.includes(size)}
                                                    onClick={() => setSelectedSize(size)}
                                                />
                                                <label htmlFor={size}>{size}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.page__product__right__checkout}>
                                    <Link to=''>
                                        <Button size='lg' theme='primary'>
                                            Buy Now
                                        </Button>
                                    </Link>
                                    <Button size='lg' theme='secondary' onClick={handleAddClick}>Add to bag</Button>
                                    <Button theme='iconary' size='lg' onClick={toggleFavorite}>
                                        {isFavorite ? <FavoriteActiveIcon /> : <FavoriteIcon />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.page__reviews}>
                        <h2>Rating & Reviews</h2>
                        <div className={styles.page__reviews__rating}>
                            <div className={styles.page__reviews__rating__left}>
                                <span>4.5</span>
                                <div className={styles.page__reviews__rating__left__info}>
                                    <ul className={styles.page__reviews__rating__left__info__stars}>
                                        {[...Array(5)].map((_, index) => (
                                            <li key={index}>
                                                <StarIcon />
                                            </li>
                                        ))}
                                    </ul>
                                    <p>40 Ratings</p>
                                </div>
                            </div>
                            <div className={styles.page__reviews__rating__right}>
                                {[...Array(5)].map((_, index) => (
                                    <div className={styles.page__reviews__rating__right__item} key={index}>
                                        <div className={styles.page__reviews__rating__right__item__stars}>
                                            <StarIcon />
                                            <span>{5 - index}</span>
                                        </div>
                                        <div className={styles.page__reviews__rating__right__item__fill}>
                                            <div style={{ width: `${100 - (20 * index)}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.page__reviews__comments}>
                            <h3>Comments ({comments.length})</h3>
                            <p>Review this product?</p>
                            <form className={styles.page__reviews__comments__send} method='POST'>
                                <textarea
                                    name="comment"
                                    id="comment"
                                    placeholder='Enter your comment...'
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                />
                                <div className={styles.page__reviews__comments__send__bottom}>
                                    <button type='submit' disabled={comment.length < 10}>Send</button>
                                </div>
                            </form>
                            <div className={styles.page__reviews__comments__list}>
                                {comments.map((comment, index) => (
                                    <Comment {...comment} key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme="light"
            />
        </div>
    )
}

export default Product