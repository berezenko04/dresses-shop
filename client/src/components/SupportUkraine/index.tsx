import { Link } from 'react-router-dom'

//styles
import styles from './SupportUkraine.module.scss'

//icons
import { ReactComponent as UAFlag } from '@/assets/icons/flag-UA.svg'
import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg'

const SupportUkraine: React.FC = () => {
    return (
        <div className={styles.alert}>
            <div className="container">
                <div className={styles.alert__wrapper}>
                    <UAFlag />
                    <p>
                        Stop the War. Support Ukraine. <Link to='https://u24.gov.ua' target='_blank'>Make a Donation</Link> to United24 program.
                    </p>
                    <button><CloseIcon /></button>
                </div>
            </div>
        </div>
    )
}

export default SupportUkraine