import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from '@/axios'

//styles
import styles from './RegistrationForm.module.scss'

//components
import AuthField from '../AuthField'

type FormValues = {
    fullName: string,
    email: string,
    password: string,
    repeatPassword: string
}

const RegistrationForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await axios.post('/auth/register', data);
            navigate('/Sandrela/login');
        } catch (err) {
            console.log(err);
            alert('Failed to register');
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.form__wrapper}>
                <div className={styles.form__block}>
                    <AuthField
                        type='text'
                        title='Full Name'
                        {...register("fullName", {
                            required: true,
                            minLength: 8,
                            maxLength: 50
                        })}
                        placeholder='Enter full name'
                        className={errors.fullName ? styles.error : ''}
                        error={!!errors.fullName}
                    />
                    {errors.fullName?.type === 'required' && <span>Full name is required.</span>}
                    {errors.fullName?.type === 'minLength' && <span>Full name must be at least 8 characters.</span>}
                    {errors.fullName?.type === 'maxLength' && <span>Full name must be less than 50 characters.</span>}
                </div>

                <div className={styles.form__block}>
                    <AuthField
                        type='email'
                        title='Email'
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        placeholder='Enter email'
                        className={errors.email ? styles.error : ''}
                        error={!!errors.email}
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
                        className={errors.password ? styles.error : ''}
                        error={!!errors.password}
                    />
                    {errors.password?.type === 'required' && <span>Password is required.</span>}
                    {errors.password?.type === 'minLength' && <span>Password must be at least 8 characters.</span>}
                    {errors.password?.type === 'maxLength' && <span>Password must be less than 32 characters.</span>}
                </div>

                <div className={styles.form__block}>
                    <AuthField
                        type='password'
                        title='Repeat Password'
                        {...register("repeatPassword", { required: true, validate: value => value === watch('password') })}
                        placeholder='Repeat your password'
                        className={errors.repeatPassword ? styles.error : ''}
                        error={!!errors.repeatPassword}
                    />
                    {errors.repeatPassword?.type === 'required' && <span>Repeat password is required.</span>}
                    {errors.repeatPassword?.type === 'validate' && <span>Passwords do not match.</span>}
                </div>
            </div>
            <button type="submit">Create Account</button>
            <p>Already have account? <Link to="/Sandrela/login">Log in</Link></p>
        </form>
    );
}

export default RegistrationForm