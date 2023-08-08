import { useNavigate, Link } from 'react-router-dom'

//styles
import styles from './OrderSuccess.module.scss'

//components
import Button from '@/components/Button'
import MetaHead from '@/components/MetaHead'

//images
import ErrorImage from '@/assets/img/404.webp'

//icons
import { ReactComponent as ArrowLeftIcon } from '@/assets/icons/arrow-left.svg'


const OrderSuccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <MetaHead
                title='Order Success'
                desc="Thank you for your order! Your purchase at Sandrela was successful. Experience the enchanting and extraordinary products and services we offer."
            />
            <div className='container'>
                <div className={styles.page__wrapper}>
                    <div className={styles.page__left}>
                        <img src={ErrorImage} alt="404" />
                        <div className={styles.circle} />
                    </div>
                    <div className={styles.page__right}>
                        <h3>Thank you for order!</h3>
                        <h1>
                            Thank you for order!
                        </h1>
                        <p> Your order will be sent to the delivery service as soon as possible</p>
                        <div className={styles.page__right__buttons}>
                            <Button onClick={() => navigate(-1)} theme='secondary' size='lg'>
                                <ArrowLeftIcon />
                                Go back
                            </Button>
                            <Link to={'/'}>
                                <Button theme='primary' size='lg'>
                                    Go to the main page
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess