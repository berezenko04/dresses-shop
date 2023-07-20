import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect';
import { useAppDispatch } from '@/redux/store'

//styles
import styles from './Products.module.scss'

//components
import ProductCardExtended from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import ProductCardSkeleton from '@/components/Skeletons/ProductCardSkeleton';
import Filters from '@/components/Filters';
import EmptyState from '@/components/EmptyState';
import DropdownSort from '@/components/DropdownSort';
import MetaHead from '@/components/MetaHead';

//icons
import { ReactComponent as FilterIcon } from '@/assets/icons/filter.svg'

//redux
import { productsLengthSelector, productsSelector, productsStatusSelector } from '@/redux/products/selectors'
import { fetchProducts } from '@/redux/products/asyncActions'



const Products: React.FC = () => {
    const [showFilters, setShowFilters] = useState(true);
    const limit = isMobile ? 8 : 12;
    const dispatch = useAppDispatch();
    const productsLength = useSelector(productsLengthSelector);
    const products = useSelector(productsSelector);
    const status = useSelector(productsStatusSelector);
    const pageCount = Math.ceil(productsLength / limit);

    const handlePageChange = (newPage: number) => {
        dispatch(fetchProducts({ page: newPage, limit }));
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="container">
            <MetaHead
                title='Dresses'
                desc='Discover the enchanting and extraordinary products offered by Sandrela. '
            />
            <div className={styles.page}>
                <div className={styles.page__head}>
                    <h3>Dresses ({productsLength ? productsLength : 0})</h3>
                    <div className={styles.page__head__sort}>
                        <button onClick={() => setShowFilters(!showFilters)}>
                            {showFilters ? 'Hide filters' : 'Show filters'}
                            <FilterIcon />
                        </button>
                        <DropdownSort onSort={handlePageChange} />
                    </div>
                </div>
                <div className={styles.page__main}>
                    <div className={styles.page__sort}
                        style={!showFilters ? { display: 'none' } : { display: 'flex' }}>
                        <Filters />
                    </div>
                    {!products.length && status === 'success' ?
                        <div className={styles.page__main__empty}>
                            <EmptyState
                                title={'Nothing found for your request'}
                                text={'Your search did not match any results. Try clearing the filters or entering other data'}
                            />
                        </div>
                        :
                        <div className={styles.page__main__content}>
                            {status === 'loading' ?
                                [...Array(9)].map((_, index) => (
                                    <ProductCardSkeleton key={index} />
                                ))
                                :
                                products.map((product, index) => (
                                    <ProductCardExtended
                                        key={index}
                                        {...product}
                                    />
                                ))
                            }
                        </div>
                    }
                </div>
                <Pagination pageCount={pageCount} limit={limit} onPageChange={handlePageChange} />
            </div>
        </div>
    )
}

export default Products