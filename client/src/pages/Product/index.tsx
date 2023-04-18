import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

//styles
import styles from './Product.module.scss'

//components

//redux
import { useAppDispatch } from '@/redux/store';
import { fetchProduct } from '@/redux/products/asyncActions';
import { productsSelector } from '@/redux/products/selectors';


const Product: React.FC = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const product = useSelector(productsSelector);

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(id));
        }
    }, [])

    return (
        <div className={styles.page}>
            <div className="container">
                <p>{product[0]?.price}</p>
                <p>{product[0]?.title}</p>
            </div>
        </div>
    )
}

export default Product