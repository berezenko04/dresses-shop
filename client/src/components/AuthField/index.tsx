import { InputHTMLAttributes, forwardRef } from 'react'

//styles
import styles from './AuthField.module.scss'

//icons
import { ReactComponent as ErrorIcon } from '@/assets/icons/alert-circle.svg'

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string,
    error: boolean
}

const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(({ title, error, ...props }, ref) => {
    return (
        <div className={styles.input}>
            <label htmlFor={title}>{title}</label>
            <div className={styles.input__block}>
                <input ref={ref} id={title} {...props} />
                {error && <ErrorIcon />}
            </div>
        </div>
    )
})

export default AuthField