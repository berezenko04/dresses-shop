import { Oval } from 'react-loader-spinner'

//styles
import styles from './Loader.module.scss'

const Loader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loader__wrapper}>
                <Oval color={'#ffffff'} width={80} height={80} ariaLabel="loading" />
                <p>Loading...</p>
            </div>
        </div>
    )
}

export default Loader