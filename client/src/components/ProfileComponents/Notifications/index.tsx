
//styles
import styles from './Notifications.module.scss'

//components
import Switch from '@/components/Switch';

const Notifications: React.FC = () => {
    const notificationsList = [{ title: 'test', subtitle: 'test' }];

    return (
        <div className={styles.notifications}>
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
    )
}

export default Notifications