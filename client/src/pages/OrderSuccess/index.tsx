import { useNavigate, Link } from 'react-router-dom'

//styles
import styles from './OrderSuccess.module.scss'

//components
import Button from '@/components/Button'
import MetaHead from '@/components/MetaHead'

//images
import RingsImage from '@/assets/img/rings.png'


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
                        <img src={RingsImage} alt="Order Success" />
                    </div>
                    <div className={styles.page__right}>
                        <h1>
                            Thank you for order!
                        </h1>
                        <p>The transaction was successful! Your order has been added to your order list.</p>
                        <div className={styles.page__right__buttons}>
                            <Button
                                onClick={() => navigate('/profile/orders')}
                                theme='secondary'
                                size={window.innerWidth > 768 ? 'lg' : 'sm'}
                            >
                                Go to the order list
                            </Button>
                            <Link to={'/'}>
                                <Button
                                    theme='primary'
                                    size={window.innerWidth > 768 ? 'lg' : 'sm'}
                                >
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