//styles
import styles from './Header.module.scss'

//images
import HeaderImage from '@/assets/img/header.jpg'


const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className={styles.header__image}>
                    <img src={HeaderImage} alt="header" />
                </div>
                <div className={styles.header__text}>
                    <h1>Bridal shop with the possibility of individual tailoring</h1>
                </div>
            </div>
        </header>
    )
}

export default Header