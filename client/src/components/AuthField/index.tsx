import { InputHTMLAttributes, forwardRef } from 'react'

//styles
import styles from './AuthField.module.scss'

//icons
import { ReactComponent as ErrorIcon } from '@/assets/icons/alert-circle.svg'

interface IAuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string,
    error?: boolean
}

const AuthField = forwardRef<HTMLInputElement, IAuthFieldProps>(({ title, error, ...props }, ref) => {
    return (
        <div className={styles.input}>
            <label htmlFor={title}>{title}</label>
            <div className={styles.input__block}>
                <input
                    ref={ref}
                    id={title}
                    {...props}
                    className={error ? styles.input__block__error : ''}
                />
                {error && <ErrorIcon />}
            </div>
        </div>
    )
})

export default AuthField