import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

//styles
import styles from './BreadCrumbs.module.scss'

//icons
import { ReactComponent as ArrowRightIcon } from '@/assets/icons/arrow-right-small.svg'

//Service
import { getProduct } from '@/API/dressesService';


const BreadCrumbs: React.FC = () => {
    const location = useLocation();
    const [productTitle, setProductTitle] = useState<string>();


    const paths = location.pathname.split('/').filter((path) => (path !== 'Sandrela') && (path !== ''));
    const match = paths.length === 2 && paths.includes('dresses');

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProduct(paths[1]);
            setProductTitle(data.title);
        }
        match && fetchProduct();
    }, [match, paths])

    return (
        <div className={styles.crumbs} >
            <div className="container">
                <ul>
                    {location.pathname !== '/' &&
                        <li>
                            <Link to={'/'}>Home</Link>
                            <ArrowRightIcon />
                        </li>
                    }
                    {paths.map((path, index) => (
                        <li key={index}>
                            {index !== paths.length - 1 ?
                                <>
                                    {path !== 'profile' ?
                                        <Link to={`/${paths.slice(0, index + 1).join('/')}`}>
                                            {path}
                                        </Link>
                                        :
                                        <span>
                                            {path}
                                        </span>
                                    }
                                    <ArrowRightIcon />
                                </>
                                :
                                <span>{match ? productTitle : path}</span>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BreadCrumbs