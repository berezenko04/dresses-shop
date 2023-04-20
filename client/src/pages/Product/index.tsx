import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

//styles
import styles from './Product.module.scss'

//components
import CardPrice from '@/components/CardPrice';
import Colors from '@/components/Colors';

//Array
import { sizes } from '../Products';

//redux
import { useAppDispatch } from '@/redux/store';
import { fetchProduct } from '@/redux/products/asyncActions';
import { productsSelector } from '@/redux/products/selectors';

//icons
import { ReactComponent as FavoriteIcon } from '@/assets/icons/favorite.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star.svg'



const Product: React.FC = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const product = useSelector(productsSelector);

    const isAvailable = product[0]?.stock;

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(id));
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
                                <p className={styles.page__product__right__desc}>{product[0]?.desc}</p>
                                <div className={styles.page__product__right__sizes}>
                                    <div className={styles.page__product__right__sizes__head}>
                                        <h6>Select Size</h6>
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
                                    <Link to=''>Buy Now</Link>
                                    <button>Add To Bag</button>
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
                            <h3>Comments (10)</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Product