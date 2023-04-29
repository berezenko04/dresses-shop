import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

//styles
import styles from './Navbar.module.scss'

//icons
import { ReactComponent as PhoneIcon } from '@/assets/icons/phone.svg'
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg'
import { ReactComponent as FavoriteIcon } from '@/assets/icons/favorite.svg'
import { ReactComponent as CartIcon } from '@/assets/icons/cart.svg'
import { ReactComponent as PlatesIcon } from '@/assets/icons/grid-plates.svg'

//redyx
import { authDataSelector, isAuthSelector } from '@/redux/auth/selectors'
import { useAppDispatch } from '@/redux/store'
import { fetchAuthMe } from '@/redux/auth/asyncActions'


const Navbar: React.FC = () => {
    const links = [
        { name: 'Find a Store', href: '' },
        { name: 'Help', href: '' },
        { name: 'Join us', href: '' },
        { name: 'Sign in', href: '/Sandrela/login' }
    ];

    const dispatch = useAppDispatch();

    const isAuth = useSelector(isAuthSelector);
    const data = useSelector(authDataSelector);

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [])

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__top}>
                <div className="container">
                    <div className={styles.navbar__top__wrapper}>
                        <Link
                            to="tel:+380956380963"
                            className={styles.navbar__top__phone}
                        >
                            <PhoneIcon />
                            +380956380963
                        </Link>
                        <ul className={styles.navbar__top__info}>
                            {links.map((link, index) => (
                                (index === 3 && isAuth) ? '' :
                                    <li key={index}><Link to={link.href}>{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.navbar__bottom}>
                <div className="container">
                    <div className={styles.navbar__bottom__wrapper}>
                        <Link to="/Sandrela" className={styles.navbar__bottom__logo}>Sandrela</Link>
                        <button className={styles.navbar__bottom__catalog}>
                            <PlatesIcon />
                            Catalog
                        </button>
                        <div className={styles.navbar__bottom__search}>
                            <SearchIcon />
                            <input type="text" placeholder='Search something...' />
                        </div>
                        <div className={styles.navbar__bottom__user}>
                            <Link to="/"><FavoriteIcon /></Link>
                            <Link to="/"><CartIcon /></Link>
                            {isAuth &&
                                <Link to={`/Sandrela/profile/${data?._id}`}>
                                    <img src={data?.avatarUrl} alt="avatar" />
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar