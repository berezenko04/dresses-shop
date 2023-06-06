import { ToastContainer } from 'react-toastify';

//styles
import styles from './AuthLayout.module.scss'
import 'react-toastify/dist/ReactToastify.css';

//images
import WeddingImage from '@/assets/img/register.jpg'

type TAuthLayoutProps = {
    children: React.ReactNode
}

const AuthLayout: React.FC<TAuthLayoutProps> = ({ children }) => {
    return (
        <>
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
                    {children}
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme="light"
            />
        </>
    )
}

export default AuthLayout