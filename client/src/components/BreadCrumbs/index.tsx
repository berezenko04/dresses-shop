import { Link, useLocation } from 'react-router-dom'

//styles
import styles from './BreadCrumbs.module.scss'

//icons
import { ReactComponent as ArrowRightIcon } from '@/assets/icons/arrow-right-small.svg'

const BreadCrumbs: React.FC = () => {
    const location = useLocation();

    const paths = location.pathname.split('/').filter((path) => (path !== 'Sandrela') && (path !== ''));

    return (
        <div className={styles.block}>
            <div className="container">
                <ul>
                    <li>
                        <Link to={'/Sandrela/'}>Home</Link>
                        <ArrowRightIcon />
                    </li>
                    {paths.map((path, index) => (
                        <li key={index}>
                            {index !== paths.length - 1 ?
                                <>
                                    <Link to={`/Sandrela/${paths.slice(0, index + 1).join('/')}`}>
                                        {path}
                                    </Link>
                                    <ArrowRightIcon />
                                </>
                                :
                                <span>{path}</span>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BreadCrumbs