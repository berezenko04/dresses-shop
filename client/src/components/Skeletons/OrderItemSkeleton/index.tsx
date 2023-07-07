//styles
import styles from './OrderItemSkeleton.module.scss'


const OrderItemSkeleton: React.FC = () => {
    return (
        <div className={styles.item}>
            {[...Array(7)].map((_, index) => (
                <div key={index} />
            ))}
        </div>
    )
}

export default OrderItemSkeleton