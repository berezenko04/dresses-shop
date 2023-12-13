import { Fragment, useState } from 'react'
import cn from 'classnames'
import creditCardType from 'credit-card-type';

//styles
import styles from './OrderItem.module.scss'

//icons
import { ReactComponent as ArrowDownIcon } from '@/assets/icons/arrow-down.svg'
import { ReactComponent as PrintIcon } from '@/assets/icons/print.svg'
import { ReactComponent as DownloadIcon } from '@/assets/icons/upload.svg'

//redux
import { TOrderItem } from '@/redux/orders/types'

const OrderItem: React.FC<TOrderItem> = ({
    orderId,
    date,
    products,
    subTotal,
    status,
    discount,
    shippingMethod, 
    shippingAddress,
    paymentMethod,
    trackingNumber,
    shipmentCost
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const creditType = creditCardType(paymentMethod)[0].niceType;
    const shipmentPrice = shipmentCost || 0;

    return (
        <div className={styles.item}>
            <ul className={styles.item__head}>
                <li>
                    <button onClick={() => setIsVisible(!isVisible)}>
                        <ArrowDownIcon className={cn(isVisible ? styles.open : styles.closed)} />
                    </button>
                </li>
                <li>
                    <p>#{orderId}</p>
                </li>
                <li>
                    <p>{date}</p>
                </li>
                <li>
                    <p>{products.length}</p>
                </li>
                <li>
                    <p>{subTotal + shipmentPrice} UAH</p>
                </li>
                <li>
                    <span>{status}</span>
                </li>
                <li>
                    <button>
                        <PrintIcon />
                    </button>
                    <button>
                        <DownloadIcon />
                    </button>
                </li>
            </ul>
            {isVisible &&
                <div className={styles.item__main}>
                    <div className={styles.item__main__info}>
                        <ul className={styles.item__main__info__head}>
                            <li>
                                <p>Shipping Address</p>
                            </li>
                            <li>
                                <p>Shipping method</p>
                            </li>
                            <li>
                                <p>Payment Method</p>
                            </li>
                            <li>
                                <p>Tracking Number</p>
                            </li>
                        </ul>
                        <ul className={styles.item__main__info__body}>
                            <li>
                                <p>
                                    {shippingAddress}
                                </p>
                            </li>
                            <li>
                                <p>
                                    {shippingMethod}
                                </p>
                            </li>
                            <li>
                                <p>
                                    {`${creditType} **** ${paymentMethod.slice(15, 19)}`}
                                </p>
                            </li>
                            <li>
                                <p>
                                    {trackingNumber}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.item__main__order}>
                        <ul className={styles.item__main__order__head}>
                            <li>
                                <p>Product</p>
                            </li>
                            <li>
                                <p>QTY</p>
                            </li>
                            <li>
                                <p>Price</p>
                            </li>
                            <li>
                                <p>Total</p>
                            </li>
                        </ul>
                        <ul className={styles.item__main__order__body}>
                            {products.map((product, index) => (
                                <Fragment key={index}>
                                    <li>
                                        <div className={styles.item__main__order__body__items__block}>
                                            <div className={styles.item__main__order__body__items__block__image}>
                                                <img src={product.imageUrl} alt={product.title} />
                                            </div>
                                            <p>{product.title} ({product.size.toUpperCase()})</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>
                                            {product.quantity}
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            {product.price} UAH
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            {
                                                (product.price * product.quantity) -
                                                (product.price * product.quantity * product.discount)
                                            } UAH
                                        </p>
                                    </li>
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.item__main__total}>
                        <ul>
                            <li>
                                <p>Subtotal:</p>
                                <p>{subTotal} UAH</p>
                            </li>
                            <li>
                                <p>Discount:</p>
                                <p>{discount * 100}%</p>
                            </li>
                            <li>
                                <p>Shipment cost:</p>
                                <p>{shipmentCost} UAH</p>
                            </li>
                            <li>
                                <p>Grand Total:</p>
                                <p>{(subTotal + shipmentPrice) - (subTotal * discount)} UAH</p>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default OrderItem