import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect';
import { useAppDispatch } from '@/redux/store'

//styles
import styles from './Products.module.scss'

//components
import Dropdown from '@/components/Dropdown'
import ProductCardExtended from '@/components/ProductCardExtended';
import Pagination from '@/components/Pagination';
import ProductCardSkeleton from '@/components/Skeletons/ProductCardSkeleton';
import Sort from '@/components/Sort';

//icons
import { ReactComponent as FilterIcon } from '@/assets/icons/filter.svg'

//redux
import { productsLengthSelector, productsSelector, productsStatusSelector } from '@/redux/products/selectors'
import { fetchProducts } from '@/redux/products/asyncActions'

const Products: React.FC = () => {
    const [showFilters, setShowFilters] = useState(true);
    const [page, setPage] = useState(1);
    const limit = isMobile ? 8 : 12;
    const dispatch = useAppDispatch();
    const productsLength = useSelector(productsLengthSelector);
    const products = useSelector(productsSelector);
    const status = useSelector(productsStatusSelector);
    const pageCount = Math.ceil(productsLength / limit);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    useEffect(() => {
        dispatch(fetchProducts({ page, limit, colors: '', sizes: '', priceRange: '' }));
    }, [page, limit])


    return (
        <div className="container">
            <div className={styles.page}>
                <div className={styles.page__head}>
                    <h3>Dresses ({productsLength ? productsLength : 0})</h3>
                    <div className={styles.page__head__sort}>
                        <button onClick={() => setShowFilters(!showFilters)}>
                            {showFilters ? 'Hide filters' : 'Show filters'}
                            <FilterIcon />
                        </button>
                        <Dropdown title='Sort By'>

                        </Dropdown>
                    </div>
                </div>
                <div className={styles.page__main}>
                    {showFilters &&
                        <Sort />
                    }
                    <div className={styles.page__main__content}>
                        {status === 'loading' ?
                            [...Array(9)].map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))
                            :
                            products.map((product) => (
                                <ProductCardExtended
                                    key={product.id}
                                    {...product}
                                />
                            ))
                        }
                    </div>
                </div>
                {pageCount > 1 && <Pagination pageCount={pageCount} limit={limit} onPageChange={handlePageChange} />}
            </div>
        </div>
    )
}

export default Products