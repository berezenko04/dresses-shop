import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';

//styles
import styles from './Product.module.scss'
import 'react-lazy-load-image-component/src/effects/blur.css';

//components
import CardPrice from '@/components/CardPrice';
import Colors from '@/components/Colors';
import Comment from '@/components/Comment';
import Button from '@/components/Button';
import CommentSkeleton from '@/components/Skeletons/CommentSkeleton';
import PostComment from '@/components/PostComment';
import MetaHead from '@/components/MetaHead';

//redux
import { useAppDispatch } from '@/redux/store';
import { fetchComments } from '@/redux/comments/asyncActions';
import { commentsItemsSelector, commentsStatusSelector } from '@/redux/comments/selectors';
import { wishListSelector } from '@/redux/wishList/selectors';
import { updateFavorite } from '@/redux/wishList/asyncActions';
import { addToCartAsync } from '@/redux/cart/asyncActions';
import { TProductItem } from '@/redux/products/types';
import { isAuthSelector } from '@/redux/user/selectors';

//icons
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as FavoriteActiveIcon } from '@/assets/icons/heart-filled.svg'
import { ReactComponent as StarActiveIcon } from '@/assets/icons/star.svg'

//service
import { getProduct } from '@/API/dressesService';


const Product: React.FC = () => {
    const [selectedSize, setSelectedSize] = useState('xxs');
    const [imageIndex, setImageIndex] = useState(0);
    const [product, setProduct] = useState<TProductItem>();
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const wishList = useSelector(wishListSelector);
    const isFavorite = wishList.find((obj) => obj._id === id);
    const status = useSelector(commentsStatusSelector);
    const comments = useSelector(commentsItemsSelector);
    const isAuth = useSelector(isAuthSelector);

    const isAvailable = product?.stock;

    const ratingsCount = comments.filter((comment) => comment.rating !== 0).length;
    const allRating = comments.reduce((acc, item) => acc + item.rating, 0);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLoading(true);
        if (id) {
            (async () => {
                const data = await getProduct(id);
                setProduct(data);
            })();
            dispatch(fetchComments(id));
        }
        setIsLoading(false);
    }, [id]);

    const handleAddToCart = () => {
        if (isAuth) {
            product && dispatch(addToCartAsync({ id: product._id, size: selectedSize }))
        } else {
            toast.error("Please login!");
        }
    }

    const findRating = (rating: number) => {
        return comments.filter((comment) => comment.rating === rating).length;
    }

    return (
        <div className={styles.page}>
            <div className="container">
                {(!isLoading && product) &&
                    <div className={styles.page__wrapper}>
                        <MetaHead
                            title={product.title}
                            desc={product.desc}
                        />
                        <div className={styles.page__product}>
                            <div className={styles.page__product__left}>
                                <div className={styles.page__product__left__images}>
                                    {product.images.map((image, index) => (
                                        <div
                                            className={
                                                cn(styles.page__product__left__images__item,
                                                    index === imageIndex && styles.page__product__left__images__item__active)
                                            }
                                            key={index}
                                            onClick={() => setImageIndex(index)}
                                        >
                                            <LazyLoadImage
                                                src={image}
                                                alt={product.title}
                                                effect='blur'
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.page__product__left__banner}>
                                    <LazyLoadImage
                                        src={product.images[imageIndex]}
                                        alt={product.title}
                                        effect='blur'
                                    />
                                </div>
                            </div>
                            <div className={styles.page__product__right}>
                                <div className={styles.page__product__right__wrapper}>
                                    <div className={styles.page__product__right__head}>
                                        <span className={isAvailable ? styles.available : styles.out}>
                                            {isAvailable ? 'Are available' : 'Out of stock'}
                                        </span>
                                        <h3>{product.title}</h3>
                                        <div className={styles.page__product__right__head__price}>
                                            <CardPrice price={product.price} discount={product.discount} />
                                        </div>
                                        {product.discount > 0 &&
                                            <span className={styles.page__product__right__head__discount}>
                                                {product.discount * 100}% off
                                            </span>
                                        }
                                    </div>
                                    <Colors colors={product.colors} />
                                    <p className='regular'>{product.desc}</p>
                                    <div className={styles.page__product__right__sizes}>
                                        <div className={styles.page__product__right__sizes__head}>
                                            <p className='regular-uppercase'>Select Size</p>
                                            <Link to="#">Size Guide</Link>
                                        </div>
                                        <ul className={styles.page__product__right__sizes__list}>
                                            {product.sizes.map((size, index) => (
                                                <li key={index}>
                                                    <input
                                                        type="radio"
                                                        name='size'
                                                        id={size}
                                                        defaultChecked={index === 0 && isAvailable}
                                                        disabled={!isAvailable}
                                                        onClick={() => setSelectedSize(size)}
                                                    />
                                                    <label htmlFor={size}>{size}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.page__product__right__checkout}>
                                        <Button
                                            size='lg'
                                            theme='primary'
                                            onClick={handleAddToCart}
                                            disabled={!isAvailable}
                                        >
                                            {isAvailable ? 'Add to bag' : 'Out of stock'}
                                        </Button>
                                        <Button theme='iconary' size='lg' onClick={() => dispatch(updateFavorite(product._id))}>
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
                                    <span>{ratingsCount ? (allRating / ratingsCount).toFixed(1) : ratingsCount.toFixed(1)}</span>
                                    <div className={styles.page__reviews__rating__left__info}>
                                        <ul className={styles.page__reviews__rating__left__info__stars}>
                                            {[...Array(5)].map((_, index) => (
                                                <li key={index}>
                                                    <StarActiveIcon />
                                                </li>
                                            ))}
                                        </ul>
                                        <p>{ratingsCount} ratings</p>
                                    </div>
                                </div>
                                <div className={styles.page__reviews__rating__right}>
                                    {[...Array(5)].map((_, index) => (
                                        <div className={styles.page__reviews__rating__right__item} key={index}>
                                            <div className={styles.page__reviews__rating__right__item__stars}>
                                                <StarActiveIcon />
                                                <span>{5 - index}</span>
                                            </div>
                                            <div className={styles.page__reviews__rating__right__item__fill}>
                                                <div style={{ width: `${ratingsCount !== 0 ? (findRating(5 - index) * 100) / ratingsCount : 0}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.page__reviews__comments}>
                                <PostComment id={id} />
                                <div className={styles.page__reviews__comments__list}>
                                    {status === 'success' ?
                                        comments.map((comment, index) => (
                                            comment.text && <Comment {...comment} key={index} />
                                        ))
                                        :
                                        [...Array(5)].map((_, index) => (
                                            <CommentSkeleton key={index} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Product