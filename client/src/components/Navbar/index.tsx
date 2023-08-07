import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import cn from 'classnames'
import { debounce, set } from 'lodash'

//styles
import styles from './Navbar.module.scss'

//components
import CartOverlay from '../CartOverlay'
import Button from '../Button'
import SearchBar from '../SearchBar'
import NavbarOpened from '../NavbarOpened'

//icons
import { ReactComponent as PhoneIcon } from '@/assets/icons/phone.svg'
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as CartIcon } from '@/assets/icons/cart.svg'
import { ReactComponent as PlatesIcon } from '@/assets/icons/grid-plates.svg'
import { ReactComponent as MenuIcon } from '@/assets/icons/burger.svg'

//redyx
import { userDataSelector, isAuthSelector } from '@/redux/user/selectors'
import { useAppDispatch } from '@/redux/store'
import { fetchAuthMe } from '@/redux/user/asyncActions'
import { cartSelector } from '@/redux/cart/selectors'
import { wishListSelector } from '@/redux/wishList/selectors'
import { fetchWishList } from '@/redux/wishList/asyncActions'
import Logo from '../Logo'


const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const links = [
        'Find a Store',
        'Help',
        'Join us'
    ];

    const dispatch = useAppDispatch();

    const isAuth = useSelector(isAuthSelector);
    const data = useSelector(userDataSelector);
    const { cartItems } = useSelector(cartSelector);
    const wishList = useSelector(wishListSelector);

    const overlayRef = useRef<HTMLDivElement>(null);
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        dispatch(fetchAuthMe());
        dispatch(fetchWishList({}));
    }, [])

    useEffect(() => {
        const handleScroll = debounce(() => {
            const scrolledY = window.scrollY;
            if (scrolledY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
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
        <>
            <nav className={cn(styles.navbar, isScrolled && styles.shadow)}>
                {isMenuOpened &&
                    <NavbarOpened
                        setIsMenuOpened={setIsMenuOpened}
                        handleOverlayClick={handleOverlayClick}
                    />
                }
                <div className={styles.navbar__top}>
                    <div className="container">
                        <div className={styles.navbar__top__wrapper}>
                            <a
                                href="tel:+380662284162"
                                target='_blank'
                                rel='noopener noreferrer'
                                className={styles.navbar__top__phone}
                            >
                                <PhoneIcon />
                                +380662284162
                            </a>
                            <ul className={styles.navbar__top__info}>
                                {links.map((link, index) => (
                                    (index === 3 && isAuth) ? '' :
                                        <li key={index}><Link to={'#'}>{link}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.navbar__bottom}>
                    <div className="container">
                        <div className={styles.navbar__bottom__wrapper}>
                            <Logo variant='dark' />
                            <Link to='/dresses' className={styles.navbar__bottom__catalog}>
                                <PlatesIcon />
                                <span>Catalog</span>
                            </Link>
                            <div className={styles.navbar__bottom__searchbar}>
                                <SearchBar />
                            </div>
                            {isAuth ?
                                <div className={styles.navbar__bottom__user}>
                                    <Link to="/profile/wishlist">
                                        <FavoriteIcon />
                                        {wishList.length > 0 && <span>{wishList.length}</span>}
                                    </Link>
                                    <button
                                        onClick={handleOverlayClick}
                                        className={styles.navbar__bottom__user__cart}
                                    >
                                        <CartIcon />
                                        {cartItems.length > 0 && <span>{cartItems.length}</span>}
                                    </button>
                                    <Link
                                        className={styles.navbar__bottom__user__avatar}
                                        to={`/profile/account`}
                                    >
                                        <img src={data?.avatarUrl} alt="" />
                                    </Link>
                                    <button
                                        className={styles.navbar__bottom__user__burger}
                                        onClick={() => setIsMenuOpened(!isMenuOpened)}
                                    >
                                        <MenuIcon />
                                    </button>
                                </div>
                                :
                                <div className={styles.navbar__bottom__auth}>
                                    <Link to={'/register'}>
                                        <Button theme='secondary' size='sm'>
                                            Sign Up
                                        </Button>
                                    </Link>
                                    <Link to={'/login'}>
                                        <Button theme='primary' size='sm'>
                                            Login
                                        </Button>
                                    </Link>
                                    <button
                                        className={styles.navbar__bottom__user__burger}
                                        onClick={() => setIsMenuOpened(!isMenuOpened)}
                                    >
                                        <MenuIcon />
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav >
            <CartOverlay isOpened={isOpened} ref={overlayRef} handleOverlayClick={handleOverlayClick} />
        </>
    )
}

export default Navbar