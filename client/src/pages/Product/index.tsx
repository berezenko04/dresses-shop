import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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

//icons
import { ReactComponent as FavoriteIcon } from '@/assets/icons/favorite.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star.svg'



const Product: React.FC = () => {

    const [comment, setComment] = useState("");

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const product = useSelector(productsSelector);
    const comments = useSelector(commentsItemsSelector);

    const isAvailable = product[0]?.stock;

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(id));
            dispatch(fetchComments(id));
        }
    }, [])

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.page__wrapper}>
                    <div className={styles.page__product}>
                        <div className={styles.page__product__left}>
                            <div className={styles.page__product__left__images}>
                                {[...Array(4)].map(() => (
                                    <div className={styles.page__product__left__images__item}>
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
                                                <input type="radio" name='size' id={size} disabled={product[0]?.sizes && !product[0]?.sizes.includes(size)} />
                                                <label htmlFor={size}>{size}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.page__product__right__checkout}>
                                    <Link to=''><Button size='lg' theme='primary'>Buy Now</Button></Link>
                                    <Button size='lg' theme='secondary'>Add to bag</Button>
                                    <button><FavoriteIcon /></button>
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
                                    <div className={styles.page__reviews__rating__right__item}>
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
        </div>

    )
}

export default Product