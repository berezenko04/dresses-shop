import styles from './Register.module.scss'

//images
import WeddingImage from '@/assets/img/register.jpg'

//icons
import { ReactComponent as LogoIcon } from '@/assets/icons/frorex-logo.svg'
import AuthField from '@/components/AuthField'
import RegistrationForm from '@/components/RegistrationForm'

const Register: React.FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles.page__left}>
                <img src={WeddingImage} alt="wedding" />
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
                    <h2>Create an account</h2>
                    <p>Let’s get started with your 30day free trial.</p>
                </div>
                <RegistrationForm />
            </div>
        </div>
    )
}

export default Register