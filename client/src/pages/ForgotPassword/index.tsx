import { useState } from "react"
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "@/axios"

//styles
import styles from './ForgotPassword.module.scss'

//components
import AuthField from '../../components/AuthField'
import Button from '../../components/Button'
import AuthFormHead from "@/components/AuthFormHead"
import AuthLayout from '@/layout/AuthLayout'

//redux
import { authErrorSelector, isAuthSelector } from '@/redux/user/selectors'

//icons
import { ReactComponent as ArrowLeftIcon } from '@/assets/icons/arrow-left-small.svg'


type ForgotPasswordValues = {
    email: string
}

const ForgotPassword: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordValues>();
    const message = useSelector(authErrorSelector);
    const user = useSelector(isAuthSelector);
    const [verified, setVerified] = useState(false);
    const [email, setEmail] = useState('');
    const [timer, setTimer] = useState(false);

    const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
        (async () => {
            try {
                await axios.post('/forgot-password', data);
                setVerified(true);
            } catch (err) {
                toast.error('User is not found');
            }
        })();
    }

    const handleResend = () => {
        onSubmit({ email: email });
        toast.success('Email resend successfully');

    }

    return (
        <AuthLayout>
            {!verified ?
                <AuthFormHead
                    title="Forgot password?"
                    text="No worries, we’ll send you reset instructions"
                />
                :
                <AuthFormHead
                    title="Check your email"
                    text={`We sent a password reset link to ${email}`}
                />
            }
            {!verified &&
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.form__wrapper}>
                        <div className={styles.form__block}>
                            <AuthField
                                type='text'
                                title='Email'
                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                placeholder='Enter email'
                                defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={errors.email || (message === 'User is not found' && !!message) ? styles.error : ''}
                                error={!!errors.email || (message === 'User is not found' && !!message)}
                            />
                            {errors.email?.type === 'required' && <span>Email is required.</span>}
                            {errors.email?.type === 'pattern' && <span>Invalid email address.</span>}
                        </div>
                        <Button size='sm' theme='primary' type="submit">Reset Password</Button>
                    </div>
                </form>
            }
            {verified &&
                <div className={styles.form__resend}>
                    <p>Didn't receive the email?</p>
                    {!timer ?
                        <button onClick={handleResend}>Click to resend</button>
                        :
                        <p></p>
                    }
                </div>
            }

            {!user ?
                <Link to="/Sandrela/login">
                    <Button size='sm' theme='tertiary-link' type='button'>
                        <ArrowLeftIcon />
                        Back to login
                    </Button>
                </Link>
                :
                <Link to="/Sandrela/profile/settings">
                    <Button size='sm' theme='tertiary-link' type='button'>
                        <ArrowLeftIcon />
                        Back to settings
                    </Button>
                </Link>
            }
        </AuthLayout>
    )
}

export default ForgotPassword