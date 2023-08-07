//styles
import styles from './OrderSuccess.module.scss'

//components
import MetaHead from '@/components/MetaHead'


const OrderSuccess: React.FC = () => {
    return (
        <div className="container">
            <MetaHead
                title='Order Success'
                desc="Thank you for your order! Your purchase at Sandrela was successful. Experience the enchanting and extraordinary products and services we offer."
            />
            <div className={styles.page}>
                <h1>Thank you!</h1>
            </div>
        </div>
    )
}

export default OrderSuccess