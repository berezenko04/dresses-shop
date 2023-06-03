import { useState } from 'react'
import cn from 'classnames'

//styles
import styles from './OrderItem.module.scss'

//icons
import { ReactComponent as ArrowDownIcon } from '@/assets/icons/arrow-down.svg'
import { ReactComponent as PrintIcon } from '@/assets/icons/print.svg'
import { ReactComponent as DownloadIcon } from '@/assets/icons/upload.svg'

const OrderItem = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={styles.item}>
            <ul className={styles.item__head}>
                <li>
                    <button onClick={() => setIsVisible(!isVisible)}>
                        <ArrowDownIcon className={cn(isVisible ? styles.open : styles.closed)} />
                    </button>
                </li>
                <li>
                    <p>#74392</p>
                </li>
                <li>
                    <p>06/11/2022</p>
                </li>
                <li>
                    <p>24</p>
                </li>
                <li>
                    <p>12,396.00 UAH</p>
                </li>
                <li>
                    <span>Shipped</span>
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
                                    2118 Thornridge Cir. Syracuse, Connecticut 35624
                                </p>
                            </li>
                            <li>
                                <p>
                                    Express delivery (DHL Express)
                                </p>
                            </li>
                            <li>
                                <p>
                                    VISA **** 5642
                                </p>
                            </li>
                            <li>
                                <p>
                                    ID2545345436RS
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
                            <li>
                                <div className={styles.item__main__order__body__block}>
                                    <div className={styles.item__main__order__body__block__image}>
                                        <img src={'/default-avatar.png'} alt="" />
                                    </div>
                                    <p>Helly</p>
                                </div>
                            </li>
                            <li>
                                <p>
                                    1
                                </p>
                            </li>
                            <li>
                                <p>
                                    2100 UAH
                                </p>
                            </li>
                            <li>
                                <p>
                                    2000 UAH
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.item__main__total}>
                        <ul>
                            <li>
                                <p>Subtotal:</p>
                                <p>2200 UAH</p>
                            </li>
                            <li>
                                <p>Discount:</p>
                                <p>20%</p>
                            </li>
                            <li>
                                <p>Shipment cost:</p>
                                <p>1200 UAH</p>
                            </li>
                            <li>
                                <p>Grand Total:</p>
                                <p>7100 UAH</p>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default OrderItem