import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { SwiperSlide } from 'swiper/react'
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux'

//styles
import styles from './Home.module.scss'

//components
import SectionBlock from '@/components/SectionBlock';
import SwiperBlock from '@/components/SwiperBlock';
import ProductCard from '@/components/ProductCard';

//redux
import { productsSelector } from '@/redux/products/selectors';
import { fetchProducts } from '@/redux/products/asyncActions';


const Home: React.FC = () => {
    const achievements = [
        { count: 1000, desc: 'Different dresses' },
        { count: 10000, desc: 'Sold dresses' },
        { count: 10000, desc: 'Satisfied customers' }
    ];

    const dispatch = useAppDispatch();
    const products = useSelector(productsSelector);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    return (
        <div className={styles.page}>
            <SectionBlock className={styles.achievements}>
                <h2>Achievement</h2>
                <ul>
                    {achievements.map((achievement, index) => (
                        <li key={index}>
                            <span>{achievement.count}+</span>
                            <p>{achievement.desc}</p>
                        </li>
                    ))}
                </ul>
            </SectionBlock>
            <SectionBlock className={styles.categories}>
                <h2>Types of dresses</h2>
                <ul>
                    {[...Array(6)].map((_, index) => (
                        <li key={index}>
                            <Link to="/">
                                <img src={`categories/${index + 1}.jpg`} alt="" />
                                <h4>Lush Dresses</h4>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SectionBlock>
            <SectionBlock className={styles.popular}>
                <div className={styles.popular__head}>
                    <h2>The Most Popular Dresses</h2>
                    <div className={styles.popular__head__controls}>

                    </div>
                </div>
                <SwiperBlock>
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard {...product} />
                        </SwiperSlide>
                    ))}
                </SwiperBlock>
            </SectionBlock>
        </div>
    )
}

export default Home