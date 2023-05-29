import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/redux/store'

//styles
import styles from './Settings.module.scss'

//components
import Button from '@/components/Button'
import AccountInput from '@/components/ProfileComponents/AccountInput'
import DeviceInfo from '@/components/ProfileComponents/DeviceInfo'
import ProfileLayout from '@/layout/ProfileLayout'

//icons
import { ReactComponent as TrashIcon } from '@/assets/icons/trash.svg'

//redux
import { fetchAuthMe } from '@/redux/user/asyncActions'



const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            dispatch(fetchAuthMe());
            navigate('/Sandrela/');
        }
    }

    return (
        <div className={styles.settings}>
            <ProfileLayout>
                <div className={styles.settings__wrapper}>
                    <div className={styles.settings__block}>
                        <h3>Security</h3>
                        <div className={styles.settings__security}>
                            <h4>Current Device</h4>
                            <div className={styles.settings__security__current}>
                                <DeviceInfo />
                                <button onClick={handleLogout}>
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.settings__block}>
                        <h3>Password</h3>
                        <form className={styles.settings__passwordForm}>
                            <div className={styles.settings__passwordForm__fields}>
                                <AccountInput
                                    title='Current Password'
                                    placeholder='Enter the current password'
                                    type='text'
                                />
                                <AccountInput
                                    title='New Password'
                                    placeholder='Enter the new password'
                                    type='text'
                                />
                                <AccountInput
                                    title='Repeat Password'
                                    placeholder='Repeat the new password'
                                    type='text'
                                />
                            </div>
                            <div className={styles.settings__passwordForm__buttons}>
                                <Button type='submit' theme='primary' size='sm'>Change Password</Button>
                                <Link to='/Sandrela/forgot-password'>
                                    <Button type='button' theme='tertiary' size='sm'>Forgot Password</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </ProfileLayout>
        </div>
    )
}

export default Settings