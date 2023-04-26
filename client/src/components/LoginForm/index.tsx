import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import axios from '@/axios'

//styles
import styles from './LoginForm.module.scss'

//components
import AuthField from '../AuthField'
import Button from '../Button'

//redux
import { fetchUserData } from '@/redux/auth/asyncActions'
import { useAppDispatch } from '@/redux/store'
import { isAuthSelector } from '@/redux/auth/selectors'


export type LoginFormValues = {
    email: string,
    password: string
}


const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(0);

    const isAuth = useSelector(isAuthSelector);
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        try {
            const response = await dispatch(fetchUserData(data));

            if ('token' in response.payload) {
                setMessage("Login success")
                window.localStorage.setItem('token', response.payload.token);
            } else {
                setError(response.payload.message);
                // setStatus(err.response?.status || '');
            }

        } catch (error) {
            console.error(error)
        }


    };

    if (isAuth) {
        <Navigate to='/Sandrela/' />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.form__wrapper}>
                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}
                {message && (
                    <p style={{ color: "green" }}>{message}</p>
                )}
                <div className={styles.form__block}>
                    <AuthField
                        type='text'
                        title='Email'
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        placeholder='Enter email'
                        className={errors.email ? styles.error : ''}
                        error={!!errors.email}
                        onInput={() => setError('')}
                    />
                    {errors.email?.type === 'required' && <span>Email is required.</span>}
                    {errors.email?.type === 'pattern' && <span>Invalid email address.</span>}
                    {status === 400 && (error && <span>{error}</span>)}
                </div>

                <div className={styles.form__block}>
                    <AuthField
                        type='password'
                        title='Password'
                        {...register("password", { required: true, minLength: 8, maxLength: 32 })}
                        placeholder='Enter password'
                        className={errors.password ? styles.error : ''}
                        error={!!errors.password}
                        onInput={() => setError('')}
                    />
                    {errors.password?.type === 'required' && <span>Password is required.</span>}
                    {errors.password?.type === 'minLength' && <span>Password must be at least 8 characters.</span>}
                    {errors.password?.type === 'maxLength' && <span>Password must be less than 32 characters.</span>}
                    {status == 401 && (error && <span>{error}</span>)}
                </div>
            </div>
            <Button size='sm' theme='primary' type="submit">Login</Button>
            <p>Don`t have an account? <Link to="/Sandrela/register">Register</Link></p>
        </form>
    );
}

export default LoginForm