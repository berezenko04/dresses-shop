import { useState } from 'react'

//styles
import styles from './SearchBar.module.scss'

//icons
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg'

//redux
import { useAppDispatch } from '@/redux/store';

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useAppDispatch();

    const fetchData = async () => {
        dispatch(fetchProducts());
    }

    return (
        <div className={styles.searchBar}>
            <div className={styles.searchBar__field}>
                <SearchIcon />
                <input
                    type="text"
                    placeholder='Search something...'
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
            </div>
        </div>
    )
}

export default SearchBar