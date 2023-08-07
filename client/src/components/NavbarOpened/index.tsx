import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

//styles
import styles from './NavbarOpened.module.scss'

//components
import SearchBar from '../SearchBar'
import Logo from '../Logo'
import Button from '../Button'

//icons
import { ReactComponent as PhoneIcon } from '@/assets/icons/phone.svg'
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as CartIcon } from '@/assets/icons/cart.svg'
import { ReactComponent as PlatesIcon } from '@/assets/icons/grid-plates.svg'
import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg'

//redux
import { isAuthSelector, userDataSelector } from '@/redux/user/selectors'
import { cartSelector } from '@/redux/cart/selectors'
import { wishListSelector } from '@/redux/wishList/selectors'



type TNavbarOpenedProps = {
    setIsMenuOpened: (arg: boolean) => void,
    handleOverlayClick: () => void
}

const NavbarOpened: React.FC<TNavbarOpenedProps> = ({ setIsMenuOpened, handleOverlayClick }) => {
    const data = useSelector(userDataSelector);
    const isAuth = useSelector(isAuthSelector);
    const { cartItems } = useSelector(cartSelector);
    const wishList = useSelector(wishListSelector);

    const secondMenu = [
        { title: 'Find a Store', path: '#' },
        { title: 'Help', path: '#' },
        { title: 'Join us', path: '#' },
    ];

    const handleClose = () => {
        setIsMenuOpened(false)
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__head}>
                <Logo variant='dark' handleClick={handleClose} />
                <button onClick={handleClose}><CloseIcon /></button>
            </div>
            {isAuth &&
                <Link onClick={handleClose} to={`/profile/account`} className={styles.navbar__user}>
                    <Link
                        to={`/profile/account`}
                    >
                        <img src={data?.avatarUrl} alt="" />
                    </Link>
                    <div className={styles.navbar__user__info}>
                        <p>{`${data?.name} ${data?.lastName}`}</p>
                        <span>{data?.email}</span>
                    </div>
                </Link>
            }
            <SearchBar />
            {!isAuth &&
                <>
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
                </>
            }
            <div className={styles.navbar__divider} />
            <ul>
                <li>
                    <Link to={'/dresses'} onClick={handleClose}>
                        <PlatesIcon />
                        Catalog
                    </Link>
                </li>
                {isAuth &&
                    <>
                        <li>
                            <Link to="/profile/wishlist" onClick={handleClose}>
                                <div className={styles.navbar__count}>
                                    <FavoriteIcon />
                                    {wishList.length > 0 && <span>{wishList.length}</span>}
                                </div>
                                Wishlist
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleOverlayClick}
                                className={styles.navbar__bottom__user__cart}
                            >

                                <div className={styles.navbar__count}>
                                    <CartIcon />
                                    {cartItems.length > 0 && <span>{cartItems.length}</span>}
                                </div>
                                Cart
                            </button>
                        </li>
                    </>
                }
            </ul>
            <div className={styles.navbar__divider} />
            <ul>
                {secondMenu.map((link, index) => (
                    <li key={index}>
                        <Link
                            to={link.path}
                            onClick={handleClose}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className={styles.navbar__divider} />
            <a
                href="tel:+380662284162"
                target='_blank'
                rel='noopener noreferrer'
                className={styles.navbar__phone}
            >
                <PhoneIcon />
                +380662284162
            </a>
        </div>
    )
}

export default NavbarOpened