import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/redux/store'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from '@/axios'
import { toast } from 'react-toastify'

//styles
import styles from './Settings.module.scss'

//components
import Button from '@/components/Button'
import AuthField from '@/components/AuthField'
import DeviceInfo from '@/components/ProfileComponents/DeviceInfo'
import ProfileLayout from '@/layout/ProfileLayout'
import LogoutModal from '@/components/LogoutModal'

//icons
import { ReactComponent as TrashIcon } from '@/assets/icons/trash.svg'

//redux
import { fetchAuthMe } from '@/redux/user/asyncActions'


interface IPasswordForm {
    currentPassword: string,
    newPassword: string,
    repeatPassword: string
}


const Settings: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<IPasswordForm>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onSubmit: SubmitHandler<IPasswordForm> = async (data) => {
        try {
            await axios.post("/change-password", data);
            toast.success('Password Changed');
            localStorage.removeItem('token');
            dispatch(fetchAuthMe());
            navigate('/Sandrela/login');
        } catch (err) {
            toast.error('Invalid Current Password!');
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
                                <button onClick={() => setIsModalOpen(true)}>
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.settings__block}>
                        <h3>Password</h3>
                        <form className={styles.settings__passwordForm} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.settings__passwordForm__fields}>
                                <div className={styles.settings__passwordForm__fields__block}>
                                    <AuthField
                                        title='Current Password'
                                        placeholder='Enter the current password'
                                        type='password'
                                        {...register("currentPassword", { required: true })}
                                        error={Boolean(errors.currentPassword)}
                                    />
                                    {errors.currentPassword?.type === "required" && (
                                        <span>Password is required.</span>
                                    )}
                                </div>
                                <div className={styles.settings__passwordForm__fields__block}>
                                    <AuthField
                                        title='New Password'
                                        placeholder='Enter the new password'
                                        type='password'
                                        {...register("newPassword", { required: true, min: 8, max: 32 })}
                                        error={Boolean(errors.newPassword)}
                                    />
                                    {errors.newPassword?.type === "required" && (
                                        <span>Password is required.</span>
                                    )}
                                    {errors.newPassword?.type === "minLength" && (
                                        <span>Password must be at least 8 characters.</span>
                                    )}
                                    {errors.newPassword?.type === "maxLength" && (
                                        <span>Password must be less than 32 characters.</span>
                                    )}
                                </div>
                                <div className={styles.settings__passwordForm__fields__block}>
                                    <AuthField
                                        title='Repeat Password'
                                        placeholder='Repeat the new password'
                                        type='password'
                                        {...register("repeatPassword", {
                                            required: true,
                                            validate: (value) => value === watch('newPassword')
                                        })}
                                        error={Boolean(errors.repeatPassword)}
                                    />
                                    {errors.repeatPassword?.type === "required" && (
                                        <span>Repeat password is required.</span>
                                    )}
                                    {errors.repeatPassword?.type === "validate" && (
                                        <span>Passwords do not match.</span>
                                    )}
                                </div>
                            </div>
                            <div className={styles.settings__passwordForm__buttons}>
                                <Button type='submit' theme='primary' size='sm'>Change Password</Button>
                                <Link to='/forgot-password'>
                                    <Button type='button' theme='tertiary' size='sm'>Forgot Password</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    <LogoutModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </div>
            </ProfileLayout>
        </div>
    )
}

export default Settings