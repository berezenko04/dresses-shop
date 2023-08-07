import { Link, useNavigate } from 'react-router-dom'

//styles
import styles from './Error404.module.scss'

//images
import ErrorImage from '@/assets/img/404.webp'

//icons
import { ReactComponent as ArrowLeftIcon } from '@/assets/icons/arrow-left.svg'

//components
import Button from '@/components/Button'
import MetaHead from '@/components/MetaHead'


const Error404: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <MetaHead
                title='Error 404'
                desc="Error 404. Not found"
            />
            <div className='container'>
                <div className={styles.page__wrapper}>
                    <div className={styles.page__left}>
                        <img src={ErrorImage} alt="404" />
                        <div className={styles.circle} />
                    </div>
                    <div className={styles.page__right}>
                        <h3>404 Error</h3>
                        <h1>
                            Whoops !
                            Something
                            went wrong
                        </h1>
                        <p>Sorry, the page are looking for doesn’t exist or has been removed. Try searching our site.</p>
                        <div className={styles.page__right__buttons}>
                            <Button onClick={() => navigate(-1)} theme='secondary' size='lg'>
                                <ArrowLeftIcon />
                                Go back
                            </Button>
                            <Link to={'/'}>
                                <Button theme='primary' size='lg'>
                                    Go to the main page
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error404