import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

//styles
import styles from './BreadCrumbs.module.scss'

//icons
import { ReactComponent as ArrowRightIcon } from '@/assets/icons/arrow-right-small.svg'

//redux
import { fetchProduct } from '@/redux/products/asyncActions';
import { productsSelector } from '@/redux/products/selectors';


const BreadCrumbs: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const product = useSelector(productsSelector);

    const paths = location.pathname.split('/').filter((path) => (path !== 'Sandrela') && (path !== ''));
    const match = paths.length === 2 && paths.includes('dresses');

    useEffect(() => {
        match && dispatch(fetchProduct(paths[1]));
    }, [match])

    return (
        <div className={styles.block}>
            <div className="container">
                <ul>
                    <li>
                        <Link to={'/Sandrela'}>Home</Link>
                        <ArrowRightIcon />
                    </li>
                    {paths.map((path, index) => (
                        <li key={index}>
                            {index !== paths.length - 1 ?
                                <>
                                    {path !== 'profile' ?
                                        <Link to={`/Sandrela/${paths.slice(0, index + 1).join('/')}`}>
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
                                <span>{match ? product[0]?.title : path}</span>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BreadCrumbs