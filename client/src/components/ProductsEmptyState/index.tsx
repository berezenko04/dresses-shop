//styles
import styles from './ProductsEmptyState.module.scss'

//icons
import { ReactComponent as EmptyIcon } from '@/assets/icons/products-empty.svg'

const ProductsEmptyState: React.FC = () => {
    return (
        <div className={styles.state}>
            <div className={styles.state__wrapper}>
                <EmptyIcon />
                <div className={styles.state__text}>
                    <h4>Nothing found for your request</h4>
                    <p>Your search did not match any results. Try clearing the filters or entering other data</p>
                </div>
            </div>
        </div>
    )
}

export default ProductsEmptyState