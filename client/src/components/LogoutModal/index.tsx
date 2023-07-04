import { useAppDispatch } from '@/redux/store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

//styles
import styles from './LogoutModal.module.scss'

//components
import Button from '../Button'

//redux
import { fetchAuthMe } from '@/redux/user/asyncActions'


type LogoutModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: (arg: boolean) => void
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overlay-opened');
        }

        return () => {
            document.body.classList.remove('overlay-opened');
        }
    }, [isModalOpen])


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