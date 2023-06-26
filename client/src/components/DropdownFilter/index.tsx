import { useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import { useAppDispatch } from '@/redux/store'

//styles
import styles from './DropdownFilter.module.scss'

//icons
import { ReactComponent as DropdownIcon } from '@/assets/icons/arrow-dropdown.svg'

//redux
import { fetchProducts } from '@/redux/products/asyncActions'


type TFilter = {
    orderBy: string,
    order: string,
    name: string
}

const DropdownFilter: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const filters: TFilter[] = [
        { orderBy: '_id', name: 'The most popular', order: 'desc' },
        { orderBy: '_id', name: 'The less popular', order: 'asc' },
        { orderBy: 'price', name: 'The most expensive', order: 'desc' },
        { orderBy: 'price', name: 'The cheapest', order: 'asc' },
    ]

    const dispatch = useAppDispatch();
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [sortOrder, setSortOrder] = useState(filters[0]);

    const handleFilterClick = (item: TFilter) => {
        setSortOrder(item);
        setIsVisible(false);
    }

    useEffect(() => {
        dispatch(fetchProducts({
            sortBy: sortOrder.orderBy,
            order: sortOrder.order
        }))
    }, [sortOrder])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLElement)) {
                setIsVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isVisible])

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div className={styles.dropdown__head} onClick={() => setIsVisible(!isVisible)}>
                <div className={styles.dropdown__head__order}>
                    <span>Sort By:</span>
                    <span>{sortOrder.name}</span>
                    <DropdownIcon className={cn(styles.icon, isVisible && styles.icon__active)} />
                </div>
                <ul className={cn(styles.dropdown__main, isVisible && styles.dropdown__main__active)}>
                    {filters.map((filter, index) => (
                        <li
                            key={index}
                            className={cn(styles.dropdown__main__item,
                                (sortOrder.orderBy === filter.orderBy && sortOrder.order === filter.order) && styles.dropdown__main__item__active)}
                        >
                            <button onClick={() => handleFilterClick(filters[index])}>
                                {filter.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DropdownFilter