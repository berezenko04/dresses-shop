import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

//styles
import styles from './Profile.module.scss'

//components
import ProfileTab from '@/components/ProfileTab';

//icons
import { ReactComponent as UserIcon } from '@/assets/icons/user.svg'
import { ReactComponent as FavoriteIcon } from '@/assets/icons/favorite.svg'
import { ReactComponent as SettingsIcon } from '@/assets/icons/settings.svg'
import { ReactComponent as ReviewsIcon } from '@/assets/icons/reviews.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star-empty.svg'
import { ReactComponent as HouseIcon } from '@/assets/icons/house.svg'
import { ReactComponent as CardIcon } from '@/assets/icons/card.svg'
import { ReactComponent as LogoutIcon } from '@/assets/icons/logout.svg'



const Profile: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = [
        { title: 'Account', icon: <UserIcon /> },
        { title: 'Wish List', icon: <FavoriteIcon /> },
        { title: 'Settings', icon: <SettingsIcon /> },
        { title: 'My reviews', icon: <ReviewsIcon /> },
        { title: 'My orders', icon: <StarIcon /> },
        { title: 'Shipping Address', icon: <HouseIcon /> },
        { title: 'Payment', icon: <CardIcon /> },
        { title: 'Logout', icon: <LogoutIcon /> },
    ];

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.page__wrapper}>
                    <div className={styles.page__tabs}>
                        {tabs.map((tab, index) => (
                            <ProfileTab
                                key={index}
                                {...tab}
                                active={index === activeIndex}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                    <div className={styles.page__main}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile