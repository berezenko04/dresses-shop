import { Oval } from 'react-loader-spinner'
import { Fragment, useEffect, useState } from 'react'

//styles
import styles from './Loader.module.scss'


const Loader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(true);
        }, 500);

        return () => clearTimeout(timer);
    }, [])

    return (
        <Fragment>
            {isLoading &&
                <div className={styles.loader}>
                    <div className={styles.loader__wrapper}>
                        <Oval color={'#ffffff'} width={80} height={80} ariaLabel="loading" />
                        <p>Loading...</p>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Loader