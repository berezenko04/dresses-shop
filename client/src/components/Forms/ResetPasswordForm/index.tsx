import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@/redux/store'
import axios from '@/axios'

//styles
import styles from './ResetPasswordForm.module.scss'

//components
import AuthField from '../../AuthField'
import Button from '../../Button'

//redux
import { isAuthSelector } from '@/redux/user/selectors'
import { fetchAuthMe } from '@/redux/user/asyncActions'

//icons
import { ReactComponent as ArrowLeftIcon } from '@/assets/icons/arrow-left-small.svg'
import { AxiosResponse } from 'axios'


type TResetPasswordFormValues = {
    password: string,
    repeatPassword: string
}

const ResetPasswordForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<TResetPasswordFormValues>();
    const user = useSelector(isAuthSelector);
    const { id, token } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const onSubmit: SubmitHandler<TResetPasswordFormValues> = async (data) => {
        try {
            await axios.post(`/reset-password/${id}/${token}`, data);
            if ('token' in localStorage) {
                localStorage.removeItem('token');
            }
            dispatch(fetchAuthMe());
            navigate('/login');
        } catch (err: AxiosResponse | any) {
            toast.error(err?.response?.data.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.form__wrapper}>
                <div className={styles.form__fields}>
                    <div className={styles.form__fields__block}>
                        <AuthField
                            type="password"
                            title="Password"
                            {...register("password", {
                                required: true,
                                minLength: 8,
                                maxLength: 32,
                            })}
                            placeholder="*************"
                            className={errors.password ? styles.error : ""}
                            error={Boolean(errors.password)}
                        />
                        {errors.password?.type === "required" && (
                            <span>Password is required.</span>
                        )}
                        {errors.password?.type === "minLength" && (
                            <span>Password must be at least 8 characters.</span>
                        )}
                        {errors.password?.type === "maxLength" && (
                            <span>Password must be less than 32 characters.</span>
                        )}
                    </div>
                    <div className={styles.form__fields__block}>
                        <AuthField
                            type="password"
                            title="Repeat Password"
                            {...register("repeatPassword", {
                                required: true,
                                validate: (value) => value === watch("password"),
                            })}
                            placeholder="*************"
                            className={errors.repeatPassword ? styles.error : ""}
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
                <Button size='sm' theme='primary' type="submit">Reset Password</Button>
                {!user &&
                    <Link to="/login">
                        <Button size='sm' theme='tertiary-link' type='button'>
                            <ArrowLeftIcon />
                            Back to login
                        </Button>
                    </Link>
                }
            </div>
        </form>
    )
}

export default ResetPasswordForm