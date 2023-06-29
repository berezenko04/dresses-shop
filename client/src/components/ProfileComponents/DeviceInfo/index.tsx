import { osName, osVersion, isMobile, isTablet } from 'react-device-detect'
import { useEffect, useState } from 'react'

//styles
import styles from './DeviceInfo.module.scss'

//icons
import { ReactComponent as DesktopIcon } from '@/assets/icons/desktop.svg'
import { ReactComponent as MobileIcon } from '@/assets/icons/mobile.svg'
import { ReactComponent as TabletIcon } from '@/assets/icons/tablet.svg'

//utils
import { formatDate } from '@/utils/formatDate'
import { getGeo } from '@/API/userService'
import { useSelector } from 'react-redux'
import { userDataSelector } from '@/redux/user/selectors'


const DeviceInfo: React.FC = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const user = useSelector(userDataSelector);


    useEffect(() => {
        (async () => {
            const data = await getGeo();
            setCountry(data.country_name);
            setCity(data.city);
        })();
    }, [])

    return (
        <div className={styles.info}>
            {isMobile ? <MobileIcon /> : isTablet ? <TabletIcon /> : <DesktopIcon />}
            <div className={styles.info__device}>
                <h4>{`${osName} ${osVersion}${country && city && `, ${country} ${city}`}`}</h4>
                <p>Session started on {user && formatDate(user.iat)}</p>
            </div>
        </div>
    )
}

export default DeviceInfo