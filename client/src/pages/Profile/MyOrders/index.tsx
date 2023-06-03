//styles
import styles from './MyOrders.module.scss'

//components
import ProfileLayout from '@/layout/ProfileLayout'
import Button from '@/components/Button'
import OrderItem from '@/components/OrderItem'

//icons
import { ReactComponent as UploadIcon } from '@/assets/icons/upload.svg'


const MyOrders: React.FC = () => {
    return (
        <div className={styles.orders}>
            <ProfileLayout>
                <div className={styles.orders__wrapper}>
                    <div className={styles.orders__head}>
                        <h3>Orders</h3>
                        <Button theme='tertiary' size='sm'>
                            Download CSV
                            <UploadIcon />
                        </Button>
                    </div>
                    <div className={styles.orders__main}>
                        <div className={styles.orders__main__head}>
                            <div></div>
                            <p>Order Id</p>
                            <p>Date</p>
                            <p>Items</p>
                            <p>Total Amount</p>
                            <p>Status</p>
                            <p>Action</p>
                        </div>
                        <div className={styles.orders__main__content}>
                            <OrderItem />
                            <OrderItem />
                            <OrderItem />
                            <OrderItem />
                        </div>
                    </div>
                </div>
            </ProfileLayout>
        </div>
    )
}

export default MyOrders