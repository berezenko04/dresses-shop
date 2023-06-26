import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

//styles
import styles from './SupportUkraine.module.scss'

//icons
import { ReactComponent as UAFlag } from '@/assets/icons/flag-UA.svg'
import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg'


const HeaderAlert: React.FC = () => {
    const [isHidden, setIsHidden] = useState(false);


    const handleClose = () => {
        setIsHidden(true);
        Cookies.set('AlertClosed', 'true', { expires: 7 });
    }

    useEffect(() => {
        const isClosed = Cookies.get('AlertClosed');
        if (isClosed) {
            setIsHidden(true);
        }
    }, [])


    return (
        <>
            {!isHidden &&
                <div className={styles.alert}>
                    <div className="container">
                        <div className={styles.alert__wrapper}>
                            <UAFlag />
                            <p>
                                Stop the War. Support Ukraine. <Link to='https://u24.gov.ua' target='_blank'>Make a Donation</Link> to United24 program.
                            </p>
                            <button onClick={handleClose}><CloseIcon /></button>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default HeaderAlert