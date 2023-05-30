import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'

//styles
import styles from './Navbar.module.scss'

//components
import CartOverlay from '../CartOverlay'
import Button from '../Button'

//icons
import { ReactComponent as PhoneIcon } from '@/assets/icons/phone.svg'
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg'
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as CartIcon } from '@/assets/icons/cart.svg'
import { ReactComponent as PlatesIcon } from '@/assets/icons/grid-plates.svg'

//redyx
import { userDataSelector, isAuthSelector } from '@/redux/user/selectors'
import { useAppDispatch } from '@/redux/store'
import { fetchAuthMe } from '@/redux/user/asyncActions'
import { cartSelector } from '@/redux/cart/selectors'
import { wishListSelector } from '@/redux/wishList/selectors'


const Navbar: React.FC = () => {
    const links = [
        { name: 'Find a Store', href: '' },
        { name: 'Help', href: '' },
        { name: 'Join us', href: '' },
    ];

    const dispatch = useAppDispatch();

    const isAuth = useSelector(isAuthSelector);
    const data = useSelector(userDataSelector);
    const cartItems = useSelector(cartSelector);
    const wishList = useSelector(wishListSelector);

    const overlayRef = useRef<HTMLDivElement>(null);
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [])


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (overlayRef.current && !overlayRef.current.contains(e.target as HTMLElement) && isOpened) {
                setIsOpened(false);
                document.body.classList.toggle('overlay-opened');
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpened])

    const handleOverlayClick = () => {
        setIsOpened(!isOpened);
        document.body.classList.toggle('overlay-opened');
    }

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
                        {isAuth ?
                            <div className={styles.navbar__bottom__user}>
                                <Link to="/Sandrela/profile/wishlist">
                                    <FavoriteIcon />
                                    {wishList.length > 0 && <span>{wishList.length}</span>}
                                </Link>
                                <button onClick={handleOverlayClick}>
                                    <CartIcon />
                                    {cartItems.length > 0 && <span>{cartItems.length}</span>}
                                </button>
                                <Link
                                    className={styles.navbar__bottom__user__avatar}
                                    to={`/Sandrela/profile/account`}
                                >
                                    <img src={data?.avatarUrl} alt="" />
                                </Link>
                            </div>
                            :
                            <div className={styles.navbar__bottom__auth}>
                                <Link to={'/Sandrela/register'}>
                                    <Button theme='secondary' size='sm'>
                                        Sign Up
                                    </Button>
                                </Link>
                                <Link to={'/Sandrela/login'}>
                                    <Button theme='primary' size='sm'>
                                        Log in
                                    </Button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <CartOverlay isOpened={isOpened} ref={overlayRef} handleOverlayClick={handleOverlayClick} />
        </nav >
    )
}

export default Navbar