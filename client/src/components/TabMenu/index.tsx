import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/redux/store'

//styles
import styles from './TabMenu.module.scss'

//components
import ProfileTab from '../ProfileTab'

//icons
import { ReactComponent as UserIcon } from '@/assets/icons/user.svg'
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as SettingsIcon } from '@/assets/icons/settings.svg'
import { ReactComponent as ReviewsIcon } from '@/assets/icons/reviews.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star-empty.svg'
import { ReactComponent as HouseIcon } from '@/assets/icons/house.svg'
import { ReactComponent as NotificationsIcon } from '@/assets/icons/notifications.svg'
import { ReactComponent as LogoutIcon } from '@/assets/icons/logout.svg'

//redux
import { fetchAuthMe } from '@/redux/user/asyncActions'


const TabMenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            dispatch(fetchAuthMe());
            navigate('/Sandrela/');
        }
    }

    const tabs = [
        { title: 'Account', icon: <UserIcon />, href: 'account' },
        { title: 'Wish List', icon: <FavoriteIcon />, href: 'wishlist' },
        { title: 'Settings', icon: <SettingsIcon />, href: 'settings' },
        { title: 'My reviews', icon: <ReviewsIcon />, href: 'reviews' },
        { title: 'My orders', icon: <StarIcon />, href: 'my-orders' },
        { title: 'Shipping Address', icon: <HouseIcon />, href: 'shipping' },
        { title: 'Notifications', icon: <NotificationsIcon />, href: 'notifications' },
    ];

    return (
        <div className={styles.tabs}>
            {tabs.map((tab, index) => (
                <ProfileTab
                    title={tab.title}
                    icon={tab.icon}
                    key={index}
                    href={tab.href}
                    active={location.pathname.includes(tab.href)}
                />
            ))}
            <button onClick={handleLogout}>
                <LogoutIcon />
                <span>Logout</span>
            </button>
        </div>
    )
}

export default TabMenu