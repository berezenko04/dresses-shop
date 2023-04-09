import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { Navigation, Swiper as SwiperType } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux'

//styles
import styles from './Home.module.scss'
import 'swiper/css';
import 'swiper/css/navigation';

//components
import SectionBlock from '@/components/SectionBlock';
import ProductCard from '@/components/ProductCard';

//redux
import { productsSelector } from '@/redux/products/selectors';
import { fetchProducts } from '@/redux/products/asyncActions';

//icons
import { ReactComponent as ArrowLeftIcon } from '@/assets/icons/arrow-left.svg'
import { ReactComponent as ArrowRightIcon } from '@/assets/icons/arrow-right.svg'
import Header from '@/components/Header';



const Home: React.FC = () => {
    const achievements = [
        { count: 1000, desc: 'Different dresses' },
        { count: 10000, desc: 'Sold dresses' },
        { count: 10000, desc: 'Satisfied customers' }
    ];

    const dispatch = useAppDispatch();
    const products = useSelector(productsSelector);

    const [prevButtonDisabled, setPrevButtonDisabled] = useState<boolean>(true);
    const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(false);

    const swiperRef = useRef<SwiperType>();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    return (
        <div className={styles.page}>
            <Header />
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
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            disabled={prevButtonDisabled}
                        >
                            <ArrowLeftIcon />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            disabled={nextButtonDisabled}
                        >
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <Swiper
                        spaceBetween={32}
                        slidesPerView={3.2}
                        modules={[Navigation]}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        onSlideChange={() => {
                            setPrevButtonDisabled(swiperRef.current?.isBeginning!);
                            setNextButtonDisabled(swiperRef.current?.isEnd!);
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard {...product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </SectionBlock>
            <SectionBlock className={styles.contacts}>
                <h2>Contacts</h2>
                <div className={styles.contacts__main}>
                    <ul>
                        <li>
                            <h4>Mail:</h4>
                            <a href="mailto:romanberezenko8@gmail.com">romanberezenko8@gmail.com</a>
                        </li>
                        <li>
                            <h4>Office:</h4>
                            <p>Poltava city, Kovalya street 3</p>
                        </li>
                        <li>
                            <h4>Phone:</h4>
                            <a href="tel:380662284162">+380662284162</a>
                        </li>
                    </ul>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162757.727244886!2d30.3922653384835!3d50.40216982563403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2sKyiv%2C%2002000!5e0!3m2!1sen!2sua!4v1681040394567!5m2!1sen!2sua"
                        width="100%"
                        height="600"
                        style={{ border: '0' }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </SectionBlock >
        </div >
    )
}

export default Home