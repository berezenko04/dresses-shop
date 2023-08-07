import { Link } from 'react-router-dom'

//styles
import styles from './AuthFormHead.module.scss'

//icons
import { ReactComponent as LogoIcon } from '@/assets/icons/frorex-logo.svg'

type TAuthFormHeadProps = {
    title: string,
    text: string
}

const AuthFormHead: React.FC<TAuthFormHeadProps> = ({ title, text }) => {
    return (
        <div className={styles.head}>
            <Link to={'/'} className={styles.head__logo}>
                <LogoIcon />
            </Link>
            <div className={styles.head__text}>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
        </div >
    )
}

export default AuthFormHead