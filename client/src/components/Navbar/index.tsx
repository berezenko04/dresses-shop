import { Link } from 'react-router-dom'

//styles
import styles from './Navbar.module.scss'

//icons
import { ReactComponent as LogoIcon } from '@/assets/icons/logo.svg'
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg'
import { ReactComponent as FavoriteIcon } from '@/assets/icons/favorite.svg'
import { ReactComponent as CartIcon } from '@/assets/icons/cart.svg'

const Navbar: React.FC = () => {
    const links = ['Find a Store', 'Help', 'Join us', 'Sign in'];
    const navLinks = ['Information', 'Product', 'Contacts'];
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__top}>
                <div className="container">
                    <div className={styles.navbar__top__wrapper}>
                        <Link to="tel:+380956380963" className={styles.navbar__top__phone}>+380956380963</Link>
                        <ul className={styles.navbar__top__info}>
                            {links.map((link, index) => (
                                <li key={index}><Link to="/">{link}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.navbar__bottom}>
                <div className="container">
                    <div className={styles.navbar__bottom__wrapper}>
                        <Link to="/Sandrela"><LogoIcon /></Link>
                        <ul>
                            {navLinks.map((link, index) => (
                                <li key={index}><Link to="/">{link}</Link></li>
                            ))}
                        </ul>
                        <ul>
                            <li><Link to="/"><SearchIcon /></Link></li>
                            <li><Link to="/"><FavoriteIcon /></Link></li>
                            <li><Link to="/"><CartIcon /></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar