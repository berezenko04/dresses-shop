import { ChangeEvent, useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

//styles
import styles from './SearchBar.module.scss'

//icons
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg'
import { ReactComponent as RemoveIcon } from '@/assets/icons/close.svg'

//service
import { getMatching } from '@/API/searchService';
import { TProductItem } from '@/redux/products/types'
    
type TSearchHistory = {
    id: string,
    title: string
}

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchList, setSearchList] = useState<TProductItem[]>();
    const [searchHistory, setSearchHistory] = useState<TSearchHistory[]>();
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const searchRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const storedHistory = Cookies.get('searchHistory');
        if (storedHistory) {
            const parsedHistory = JSON.parse(storedHistory) as TSearchHistory[];
            setSearchHistory(parsedHistory);
        }
    }, []);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.addEventListener('focus', () => setIsSearchFocused(true));
            searchRef.current.addEventListener('blur', () => setIsSearchFocused(false));
        }

        return () => {
            if (searchRef.current) {
                searchRef.current.removeEventListener('focus', () => setIsSearchFocused(true));
                searchRef.current.removeEventListener('blur', () => setIsSearchFocused(false));
            }
        };
    }, [])

    const debouncedHandleSearch = debounce((searchQuery) => {
        (async () => {
            const data = await getMatching(searchQuery);
            setSearchList(data);
        })();
    }, 500);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedHandleSearch(query);
    }

    const handleClickLink = (title: string, id: string) => {
        setSearchQuery('');
        const searchHistory = Cookies.get('searchHistory') || '[]';
        const updatedHistory = JSON.parse(searchHistory);
        updatedHistory.push({ id, title });
        Cookies.set('searchHistory', JSON.stringify(updatedHistory), { expires: 7, path: '/' });
        setSearchHistory(updatedHistory);
    }

    return (
        <div className={styles.searchBar}>
            <div className={styles.searchBar__field}>
                <SearchIcon />
                <input
                    type="text"
                    placeholder='Search something...'
                    onChange={handleSearch}
                    value={searchQuery}
                    ref={searchRef}
                />
                {searchQuery && <button onClick={() => setSearchQuery('')}><RemoveIcon /></button>}
            </div>
            {isSearchFocused &&
                <div className={styles.searchBar__dropdown}>
                    {searchList && searchList.length !== 0 &&
                        <div className={styles.searchBar__dropdown__block}>
                            <h4>Search results</h4>
                            <ul>
                                {searchList && searchList.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            onClick={() => handleClickLink(item.title, item._id)}
                                            to={`/Sandrela/dresses/${item._id}`}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                    <div className={styles.searchBar__dropdown__block}>
                        <h4>History search</h4>
                        <ul>
                            {searchHistory && searchHistory.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        onClick={() => handleClickLink(item.title, item.id)}
                                        to={`/Sandrela/dresses/${item.id}`}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchBar