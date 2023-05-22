import { InputHTMLAttributes, forwardRef } from 'react'

//styles
import styles from './AccountInput.module.scss'

//icons
import { ReactComponent as ErrorIcon } from '@/assets/icons/alert-circle.svg'

interface AссountInputProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string,
    error: boolean
}

const AccountInput = forwardRef<HTMLInputElement, AссountInputProps>(({ title, error, ...props }, ref) => {
    return (
        <div className={styles.block}>
            <label htmlFor={title}>{title}</label>
            <div className={styles.block__input}>
                <input id={title} {...props} ref={ref} />
                {error && <ErrorIcon />}
            </div>
        </div>
    )
})

export default AccountInput