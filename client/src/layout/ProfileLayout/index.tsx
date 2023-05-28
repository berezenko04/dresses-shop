//styles
import styles from './ProfileLayout.module.scss'

//components
import TabMenu from '@/components/TabMenu'

type ProfileLayoutProps = {
    children: React.ReactNode
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
    return (
        <div className='container'>
            <div className={styles.layout}>
                <TabMenu />
                {children}
            </div>
        </div>
    )
}

export default ProfileLayout