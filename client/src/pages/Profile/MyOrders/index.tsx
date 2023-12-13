import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/store'
import { useEffect, useState, Fragment } from 'react'
import { toast } from 'react-toastify'
import creditCardType from 'credit-card-type';
import cn from 'classnames'

//styles
import styles from './MyOrders.module.scss'

//components
import ProfileLayout from '@/layout/ProfileLayout'
import Button from '@/components/Button'
import OrderItem from '@/components/OrderItem'
import EmptyState from '@/components/EmptyState'
import OrderItemSkeleton from '@/components/Skeletons/OrderItemSkeleton'
import MetaHead from '@/components/MetaHead'

//icons
import { ReactComponent as UploadIcon } from '@/assets/icons/upload.svg'
import { ReactComponent as ArrowDownIcon } from '@/assets/icons/arrow-down.svg'
import { ReactComponent as PrintIcon } from '@/assets/icons/print.svg'
import { ReactComponent as DownloadIcon } from '@/assets/icons/upload.svg'

//redux
import { fetchOrders } from '@/redux/orders/asyncActions'
import { ordersSelector } from '@/redux/orders/selectors'

//service
import { exportCSV } from '@/API/ordersService'
import { TOrderItem } from '@/redux/orders/types'


const MyOrders: React.FC = () => {
    const dispatch = useAppDispatch();
    const { orders, status, length } = useSelector(ordersSelector);
    const [isVisible, setIsVisible] = useState<number[]>([]);

    const toggleVisibility = (orderId: number) => {
        setIsVisible((prevVisibleRows) => {
            if (prevVisibleRows.includes(orderId)) {
                return prevVisibleRows.filter((id) => id !== orderId);
            } else {
                return [...prevVisibleRows, orderId];
            }
        });
    };

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

    console.log(isVisible.includes(orders[0]?.orderId || -1));

    return (
        <div className={styles.orders}>
            <MetaHead
                title='My Orders'
                desc='View and manage your orders at Sandrela.'
            />
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
                        // <table className={styles.orders__main}>
                        //     <thead>
                        //         <tr>
                        //             <td></td>
                        //             <td>Order ID</td>
                        //             <td>Date</td>
                        //             <td>Items</td>
                        //             <td>Total Amount</td>
                        //             <td>Status</td>
                        //             <td>Action</td>
                        //         </tr>
                        //     </thead>
                        //     <tbody>
                        //         {orders.map((order) => (
                        //             <Fragment key={order.orderId}>
                        //                 <tr>
                        //                     <td>
                        //                         <button onClick={() => toggleVisibility(order.orderId || 0)}>
                        //                             <ArrowDownIcon className={
                        //                                 cn(isVisible.includes(order.orderId || 0) ?
                        //                                     styles.open : styles.closed)
                        //                             } />
                        //                         </button>
                        //                     </td>
                        //                     <td>{order.orderId}</td>
                        //                     <td>{order.date}</td>
                        //                     <td>{order.products.length}</td>
                        //                     <td>{order.subTotal + order.shipmentCost}</td>
                        //                     <td><span>{order.status}</span></td>
                        //                     <td>
                        //                         <button>
                        //                             <PrintIcon />
                        //                         </button>
                        //                         <button>
                        //                             <DownloadIcon />
                        //                         </button>
                        //                     </td>
                        //                 </tr>
                        //                 {order.orderId && isVisible.includes(order.orderId) && (
                        //                     <Fragment>
                        //                         <tr>
                        //                             <td>Shipping Address</td>
                        //                             <td>Shipping method</td>
                        //                             <td>Payment Method</td>
                        //                             <td>Tracking Number</td>
                        //                         </tr>
                        //                         <tr>
                        //                             <td>
                        //                                 {order.shippingAddress}
                        //                             </td>
                        //                             <td>
                        //                                 {order.shippingMethod}
                        //                             </td>
                        //                             <td>
                        //                                 {`${creditCardType(order.paymentMethod)[0].niceType} **** 
                        //                                 ${order.paymentMethod.slice(15, 19)}`}
                        //                             </td>
                        //                             <td>
                        //                                 {order.trackingNumber}
                        //                             </td>
                        //                         </tr>
                        //                     </Fragment>
                        //                 )}
                        //             </Fragment>
                        //         ))}
                        //     </tbody>
                        // </table>
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
                                {status === 'success' ?
                                    orders.map((order, index) => (
                                        <OrderItem {...order} key={index} />
                                    )) :
                                    [...Array(6)].map((_, index) => (
                                        <OrderItemSkeleton key={index} />
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </ProfileLayout>
        </div>
    )
}

export default MyOrders