import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from '@/redux/store'
import { useSelector } from 'react-redux'

//styles
import styles from './Home.module.scss'

//components
import SectionBlock from '@/components/SectionBlock'
import Header from '@/components/Header'
import Button from '@/components/Button'
import SwiperBlock from '@/components/SwiperBlock'

//redux
import { fetchProducts } from '@/redux/products/asyncActions'
import { productsSelector } from '@/redux/products/selectors'

//icons
import { ReactComponent as ArrowDiagonalIcon } from '@/assets/icons/arrow-diagonal.svg'

//images
import DressesImage from '@/assets/img/dresses.jpg'
import SuitsImage from '@/assets/img/suits.jpg'
import AccessoriesImage from '@/assets/img/accessories.jpg'
import ForHerImage from '@/assets/img/for-her.jpg'
import ForHimImage from '@/assets/img/for-him.jpg'
import TailoringImage from '@/assets/img/tailoring.jpg'
import BusinessLogo from '@/assets/img/logos/business-insider.png'
import ForbesLogo from '@/assets/img/logos/forbes.png'
import WashingtonLogo from '@/assets/img/logos/washington-post.png'
import AmazonLogo from '@/assets/img/logos/amazon.png'
import SquareLogo from '@/assets/img/logos/square.png'



const Home: React.FC = () => {
    const categories = [
        { imageUrl: DressesImage, title: 'Dresses' },
        { imageUrl: SuitsImage, title: 'Suits' },
        { imageUrl: AccessoriesImage, title: 'Accessories' }
    ]

    const companies = [
        BusinessLogo,
        ForbesLogo,
        WashingtonLogo,
        AmazonLogo,
        SquareLogo
    ]

    const dispatch = useAppDispatch();
    const products = useSelector(productsSelector);

    useEffect(() => {
        dispatch(fetchProducts({ page: 1, limit: 10 }));
    }, [])

    return (
        <div className={styles.page}>
            <Header />
            <SectionBlock>
                <h2>Our Categories</h2>
                <div className={styles.page__categories}>
                    {categories.map((category, index) => (
                        <div className={styles.page__categories__item} key={index}>
                            <img src={category.imageUrl} alt={category.title} />
                            <Link to={'/Sandrela/dresses'}>
                                {category.title}
                                <ArrowDiagonalIcon />
                            </Link>
                        </div>
                    ))}
                </div>
            </SectionBlock>
            <SectionBlock>
                <h2>Clothing</h2>
                <div className={styles.page__clothing}>
                    <div className={styles.page__clothing__item}>
                        <img src={ForHerImage} alt={'for her'} />
                        <Link to={'/Sandrela/dresses'}>
                            For Her
                            <ArrowDiagonalIcon />
                        </Link>
                    </div>
                    <div className={styles.page__clothing__item}>
                        <img src={ForHimImage} alt={'for him'} />
                        <Link to={'/Sandrela/dresses'}>
                            For Him
                            <ArrowDiagonalIcon />
                        </Link>
                    </div>
                </div>
            </SectionBlock >
            <SwiperBlock title={'Bestsellers'} products={products} />
            <SectionBlock>
                <div className={styles.page__tailoring}>
                    <div className={styles.page__tailoring__left}>
                        <h2>Bridal shop with the possibility of individual tailoring</h2>
                        <p>Bridal shop with the possibility of individual tailoring</p>
                        <Link to={'/Sandrela/dresses'}>
                            <Button theme='primary' size='sm'>Buy now</Button>
                        </Link>
                    </div>
                    <div className={styles.page__tailoring__right}>
                        <img src={TailoringImage} alt={"tailoring"} />
                    </div>
                </div>
            </SectionBlock>
            <SwiperBlock title={'Dresses'} products={products} />
            <section className={styles.page__companies}>
                <div className="container">
                    <div className={styles.page__companies__wrapper}>
                        {companies.map((company, index) => (
                            <a href="#" target='_blank' rel='noopener noreferrer' key={index}>
                                <img src={company} alt="company" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home