import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/store'
import { useEffect } from 'react'

//styles
import styles from './MyOrders.module.scss'

//components
import ProfileLayout from '@/layout/ProfileLayout'
import Button from '@/components/Button'
import OrderItem from '@/components/OrderItem'

//icons
import { ReactComponent as UploadIcon } from '@/assets/icons/upload.svg'

//redux
import { fetchOrders } from '@/redux/orders/asyncActions'
import { ordersSelector } from '@/redux/orders/selectors'

//Service
import { exportCSV } from '@/API/ordersService'
import { toast } from 'react-toastify'
import EmptyState from '@/components/EmptyState'


const MyOrders: React.FC = () => {
    const dispatch = useAppDispatch();
    const { orders, status, length } = useSelector(ordersSelector);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [])

    const handleExport = async () => {
        await exportCSV().then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.download = 'orders.csv';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        }).catch((err) => {
            toast.error('An error occured');
        });
    }

    return (
        <div className={styles.orders}>
            <ProfileLayout>
                <div className={styles.orders__wrapper}>
                    <div className={styles.orders__head}>
                        <h3>Orders ({length})</h3>
                        <Button disabled={!length} theme='tertiary' size='sm' onClick={handleExport}>
                            Download CSV
                            <UploadIcon />
                        </Button>
                    </div>
                    {!length && status === 'success' ?
                        <div className={styles.orders__empty}>
                            <EmptyState
                                title={"You haven't made any purchases yet"}
                                text={"Start exploring our products and add items to your cart to begin building your purchase history"}
                            />
                        </div>
                        :
                        <div className={styles.orders__main}>
                            <div className={styles.orders__main__head}>
                                <div />
                                <p>Order Id</p>
                                <p>Date</p>
                                <p>Items</p>
                                <p>Total Amount</p>
                                <p>Status</p>
                                <p>Action</p>
                            </div>
                            <div className={styles.orders__main__content}>
                                {orders.map((order, index) => (
                                    <OrderItem {...order} key={index} />
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </ProfileLayout>
        </div>
    )
}

export default MyOrders