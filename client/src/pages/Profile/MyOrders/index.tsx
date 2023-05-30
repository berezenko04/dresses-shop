//styles
import styles from './MyOrders.module.scss'

//components
import ProfileLayout from '@/layout/ProfileLayout'
import Button from '@/components/Button'

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
                    
                    </div>
                </div>
            </ProfileLayout>
        </div>
    )
}

export default MyOrders