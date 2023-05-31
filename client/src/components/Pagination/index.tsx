import ReactPaginate from 'react-paginate'

//styles
import styles from './Pagination.module.scss'

//icons
import { ReactComponent as ArrowPrevIcon } from '@/assets/icons/arrow-left.svg'
import { ReactComponent as ArrowNextIcon } from '@/assets/icons/arrow-right.svg'

type PaginationProps = {
    pageCount: number,
    onPageChange: (param: number) => void,
    limit: number
}


const Pagination: React.FC<PaginationProps> = ({ pageCount, limit, onPageChange }) => {

    const handlePageChange = (newPage: number) => {
        onPageChange(newPage);
        window.scrollTo(0, 0);
    };

    return (
        <ReactPaginate
            className={styles.pagination}
            previousLabel={
                <span>
                    <ArrowPrevIcon />
                    Previous
                </span>
            }
            nextLabel={
                <span>
                    Next
                    <ArrowNextIcon />
                </span>
            }
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={limit}
            onPageChange={(e) => handlePageChange(e.selected + 1)}
            activeClassName={styles.pagination__active}
        />
    )
}

export default Pagination