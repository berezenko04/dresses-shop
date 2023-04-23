import styles from './Login.module.scss'

//images
import WeddingImage from '@/assets/img/register.jpg'

//icons
import { ReactComponent as LogoIcon } from '@/assets/icons/frorex-logo.svg'

//components
import LoginForm from '@/components/LoginForm'

const Login: React.FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles.page__left}>
                <div className={styles.page__left__banner}>
                    <img src={WeddingImage} alt="wedding" />
                </div>
                <div className={styles.page__left__text__wrapper}>
                    <div className={styles.page__left__text}>
                        <h1>Turn your ideas into reality</h1>
                        <p>Start for free and get attractive offers from the community</p>
                    </div>
                </div>
            </div>
            <div className={styles.page__right}>
                <div className={styles.page__right__logo}>
                    <LogoIcon />
                </div>
                <div className={styles.page__right__head}>
                    <h2>Login an account</h2>
                    <p>Let’s get started with your 30day free trial.</p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login