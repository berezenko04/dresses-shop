import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

//styles
import styles from './ShippingInfo.module.scss'

//redux
import { userDataSelector } from '@/redux/user/selectors';

type TShippingInfoProps = {
    editable?: boolean
}

const ShippingInfo: React.FC<TShippingInfoProps> = ({ editable = false }) => {
    const data = useSelector(userDataSelector);

    return (
        <div className={styles.shipping}>
            <div className={styles.shipping__head}>
                <h4>Shipping Address</h4>
                {editable && <Link to={'/Sandrela/profile/shipping'}>Edit</Link>}
            </div>
            <ul className={styles.shipping__body}>
                <li>{`${data?.name} ${data?.lastName}`}</li>
                <li>{data?.address ? data.address : <Link to={'/Sandrela/profile/shipping'}>Set your shipping address</Link>}</li>
                <li>{data?.email}</li>
            </ul>
        </div>
    )
}

export default ShippingInfo