//styles
import styles from './EmptyState.module.scss'

//icons
import { ReactComponent as EmptyIcon } from '@/assets/icons/products-empty.svg'

type EmptyStateProps = {
    title: string,
    text: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, text }) => {
    return (
        <div className={styles.state}>
            <div className={styles.state__wrapper}>
                <EmptyIcon />
                <div className={styles.state__text}>
                    <h4>{title}</h4>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default EmptyState