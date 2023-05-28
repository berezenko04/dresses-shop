import cn from 'classnames'
import { Link } from 'react-router-dom'

//styles
import styles from './ProfileTab.module.scss'


interface ProfileTabProps {
    title: string,
    icon: React.ReactNode,
    active: boolean,
    href: string
}

const ProfileTab: React.FC<ProfileTabProps> = ({ title, icon, active, href }) => {
    return (
        <Link to={`/Sandrela/profile/${href}`} className={cn(styles.tab, active && styles.tab__active)}>
            {icon}
            <span>{title}</span>
        </Link>
    )
}

export default ProfileTab