import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

//styles
import styles from './Profile.module.scss'

//components
import ProfileTab from '@/components/ProfileTab';
import Account from '@/components/ProfileComponents/Account';

//icons
import { ReactComponent as UserIcon } from '@/assets/icons/user.svg'
import { ReactComponent as FavoriteIcon } from '@/assets/icons/heart.svg'
import { ReactComponent as SettingsIcon } from '@/assets/icons/settings.svg'
import { ReactComponent as ReviewsIcon } from '@/assets/icons/reviews.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star-empty.svg'
import { ReactComponent as HouseIcon } from '@/assets/icons/house.svg'
import { ReactComponent as CardIcon } from '@/assets/icons/card.svg'
import { ReactComponent as LogoutIcon } from '@/assets/icons/logout.svg'

//redux
import { useAppDispatch } from '@/redux/store';
import { fetchAuthMe } from '@/redux/auth/asyncActions';
import { authDataSelector } from '@/redux/auth/selectors';
import WishList from '@/components/ProfileComponents/WishList';


const Profile: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch = useAppDispatch();
    const data = useSelector(authDataSelector);


    const tabs = [
        { title: 'Account', icon: <UserIcon />, content: <Account {...data} /> },
        { title: 'Wish List', icon: <FavoriteIcon />, content: <WishList wishList={data?.wishList} /> },
        { title: 'Settings', icon: <SettingsIcon /> },
        { title: 'My reviews', icon: <ReviewsIcon /> },
        { title: 'My orders', icon: <StarIcon /> },
        { title: 'Shipping Address', icon: <HouseIcon /> },
        { title: 'Payment', icon: <CardIcon /> },
        { title: 'Logout', icon: <LogoutIcon /> },
    ];


    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [])


    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.page__wrapper}>
                    <div className={styles.page__tabs}>
                        {tabs.map((tab, index) => (
                            <ProfileTab
                                title={tab.title}
                                icon={tab.icon}
                                key={index}
                                active={index === activeIndex}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                    <div className={styles.page__main}>
                        {tabs[activeIndex].content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile