import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

//styles
import styles from './ProfileTab.module.scss'

interface ProfileTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
    icon: React.ReactNode,
    active: boolean
}

const ProfileTab: React.FC<ProfileTabProps> = ({ title, icon, active, ...props }) => {
    return (
        <button className={cn(styles.tab, active && styles.tab__active)} {...props}>
            {icon}
            <span>{title}</span>
        </button>
    )
}

export default ProfileTab