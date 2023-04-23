import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

//styles
import styles from './LoginForm.module.scss'

//components
import AuthField from '../AuthField'
import Button from '../Button'


type FormValues = {
    fullName: string,
    email: string,
    password: string,
    repeatPassword: string
}


const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            navigate('/Sandrela/');
        } catch (err: any) {
            setError(err?.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.form__wrapper}>
                <div className={styles.form__block}>
                    <AuthField
                        type='text'
                        title='Email'
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        placeholder='Enter email'
                        className={errors.email ? styles.error : ''}
                        error={!!errors.email}
                    />
                    {errors.email?.type === 'required' && <span>Email is required.</span>}
                    {errors.email?.type === 'pattern' && <span>Invalid email address.</span>}
                    {error && <span>{error}</span>}
                </div>

                <div className={styles.form__block}>
                    <AuthField
                        type='password'
                        title='Password'
                        {...register("password", { required: true, minLength: 8, maxLength: 32 })}
                        placeholder='Enter password'
                        className={errors.password ? styles.error : ''}
                        error={!!errors.password}
                    />
                    {errors.password?.type === 'required' && <span>Password is required.</span>}
                    {errors.password?.type === 'minLength' && <span>Password must be at least 8 characters.</span>}
                    {errors.password?.type === 'maxLength' && <span>Password must be less than 32 characters.</span>}
                </div>
            </div>
            <Button size='sm' theme='primary' type="submit">Login</Button>
            <p>Don`t have an account? <Link to="/Sandrela/register">Register</Link></p>
        </form>
    );
}

export default LoginForm