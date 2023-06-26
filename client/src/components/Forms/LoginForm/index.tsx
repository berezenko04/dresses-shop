import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

//styles
import styles from './LoginForm.module.scss'
import 'react-toastify/dist/ReactToastify.css';

//components
import AuthField from '../../AuthField'
import Button from '../../Button'

//redux
import { fetchUserData } from '@/redux/user/asyncActions'
import { useAppDispatch } from '@/redux/store'
import { authErrorSelector, isAuthSelector } from '@/redux/user/selectors'
import { IFetchUserResponse } from '@/redux/user/types'

export type TLoginFormValues = {
    email: string,
    password: string
}

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TLoginFormValues>();
    const message = useSelector(authErrorSelector);
    const isAuth = useSelector(isAuthSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (message) {
            toast.error(message);
        }
    }, [message]);

    const onSubmit: SubmitHandler<TLoginFormValues> = async (data) => {
        try {
            const response = await dispatch(fetchUserData(data)) as PayloadAction<IFetchUserResponse>;
            if ('token' in response.payload) {
                window.localStorage.setItem('token', response.payload.token as string);
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (isAuth) {
        return <Navigate to={'/Sandrela'} />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.form__wrapper}>
                <div className={styles.form__block}>
                    <AuthField
                        type='text'
                        title='Email'
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        placeholder='Enter email'
                        className={errors.email || (message === 'User is not found' && !!message) ? styles.error : ''}
                        error={!!errors.email || (message === 'User is not found' && !!message)}
                    />
                    {errors.email?.type === 'required' && <span>Email is required.</span>}
                    {errors.email?.type === 'pattern' && <span>Invalid email address.</span>}
                </div>
                <div className={styles.form__block}>
                    <AuthField
                        type='password'
                        title='Password'
                        {...register("password", { required: true, minLength: 8, maxLength: 32 })}
                        placeholder='Enter password'
                        className={errors.password || (message === 'Password is incorrect' && !!message) ? styles.error : ''}
                        error={!!errors.password || (message === 'Password is incorrect' && !!message)}
                    />
                    {errors.password?.type === 'required' && <span>Password is required.</span>}
                    {errors.password?.type === 'minLength' && <span>Password must be at least 8 characters.</span>}
                    {errors.password?.type === 'maxLength' && <span>Password must be less than 32 characters.</span>}
                </div>
                <Link className={styles.form__forgot} to={'/Sandrela/forgot-password'}>
                    Forgot Password?
                </Link>
            </div>
            <Button size='sm' theme='primary' type="submit">Login</Button>
            <p>Don`t have an account? <Link to="/Sandrela/register">Register</Link></p>
        </form>
    );
}

export default LoginForm

