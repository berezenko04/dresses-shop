//styles
import styles from './Notifications.module.scss'

//components
import Switch from '@/components/Switch';
import ProfileLayout from '@/layout/ProfileLayout';
import MetaHead from '@/components/MetaHead';


const Notifications: React.FC = () => {
    const notificationsList = [
        {
            title: 'Special offers and promotions',
            subtitle: 'Receive notifications about our special offers, promotions, and discounts'
        },
        {
            title: 'New product arrivals',
            subtitle: 'Be the first to know about new product arrivals in our store'
        },
        {
            title: 'Order tracking',
            subtitle: 'Enable notifications for updates on your orders'
        },
        {
            title: 'News and updates',
            subtitle: 'Subscribe to our news notifications and stay up to date with the latest happenings in our store'
        },
        {
            title: 'Recommendations and personalized offers',
            subtitle: 'Enable these notifications and enjoy an individualized shopping experience'
        }
    ];

    return (
        <div className={styles.notifications}>
            <MetaHead
                title='Notifications'
                desc='View and manage your notifications at Sandrela.'
            />
            <ProfileLayout>
                <div className={styles.notifications__wrapper}>
                    <h3>Notifications</h3>
                    <div className={styles.notifications__main}>
                        {notificationsList.map((item, index) => (
                            <div className={styles.notifications__main__item} key={index}>
                                <div className={styles.notifications__main__item__left}>
                                    <h5>{item.title}</h5>
                                    <p>{item.subtitle}</p>
                                </div>
                                <Switch />
                            </div>
                        ))}
                    </div>
                </div>
            </ProfileLayout>
        </div>
    )
}

export default Notifications