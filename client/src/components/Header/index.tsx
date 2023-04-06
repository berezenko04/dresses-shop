//styles
import styles from './Header.module.scss'

//components
import Navbar from '../Navbar'

//images
import WeddingImagePrimary from '@/assets/img/header-wedding2.jpg'
import WeddingImageSecondary from '@/assets/img/header-wedding1.jpg'


const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Navbar />
            <div className={styles.header__main}>
                <div className={styles.header__main__subtitle}>
                    <h1>Wedding <br /> dresses</h1>
                </div>
                <div className={styles.header__main__title}>
                    <h1>Wedding <br /> dresses</h1>
                </div>
                <img src={WeddingImageSecondary} alt="" />
                <div className={styles.header__main__img}>
                    <img src={WeddingImagePrimary} alt="" />
                </div>
                <img src={WeddingImageSecondary} alt="" />
            </div>
        </header>
    )
}

export default Header