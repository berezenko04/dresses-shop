import { useAppDispatch } from '@/redux/store'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { osName, osVersion } from 'react-device-detect'

//styles
import styles from './LogoutModal.module.scss'

//components
import Button from '../Button'

//redux
import { fetchAuthMe } from '@/redux/user/asyncActions'

//service
import { getGeo } from '@/API/userService'


type LogoutModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: (arg: boolean) => void
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overlay-opened');
        }

        return () => {
            document.body.classList.remove('overlay-opened');
        }
    }, [isModalOpen])

    useEffect(() => {
        (async () => {
            const data = await getGeo();
            setCountry(data.country_name);
            setCity(data.city);
        })();
    }, [])


    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(fetchAuthMe());
        navigate('/');
    }
    return (
        <>
            {isModalOpen &&
                <div className={styles.modal}>
                    <div className={styles.modal__wrapper}>
                        <p className={styles.modal__heading}>Logout</p>
                        <p>Your sessions (<span>{`${osName} ${osVersion}, ${country} ${city}`}</span>) has been removed</p>
                        <div className={styles.modal__buttons}>
                            <Button theme='tertiary' size='sm' onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button theme='primary' size='sm' onClick={handleLogout}>Logout</Button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default LogoutModal