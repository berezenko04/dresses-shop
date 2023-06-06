import { InputHTMLAttributes, forwardRef } from 'react'

//styles
import styles from './Radio.module.scss'


interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string
}

const Radio = forwardRef<HTMLInputElement, IRadioProps>(({ title, ...props }, ref) => {
    return (
        <div className={styles.radio}>
            <input type="radio" id={title} {...props} ref={ref} value={title} />
            <label htmlFor={title}>{title}</label>
        </div>
    )
})

export default Radio