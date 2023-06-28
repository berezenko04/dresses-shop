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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const searchRef = useRef<HTMLInputElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const storedHistory = Cookies.get('searchHistory');
        if (storedHistory) {
            const parsedHistory = JSON.parse(storedHistory) as TSearchHistory[];
            setSearchHistory(parsedHistory);
        }
    }, []);

    // active/disable dropdown on focus input
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleSearchFocus = () => {
        setIsDropdownOpen(true);
    };

    const handleDropdownClick = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };


    //search
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

    //clear search list
    const handleClear = () => {
        setSearchQuery('');
        setSearchList([]);
    }

    //click link
    const handleClickLink = (e: MouseEvent<HTMLAnchorElement>, title: string, id: string) => {
        e.stopPropagation();
        setSearchQuery('');
        const searchHistory = Cookies.get('searchHistory') || '[]';
        const updatedHistory = JSON.parse(searchHistory);
        if (!updatedHistory.some((item: TSearchHistory) => item.id === id && item.title === title)) {
            updatedHistory.push({ id, title });
        }
        Cookies.set('searchHistory', JSON.stringify(updatedHistory), { expires: 7, path: '/' });
        setSearchHistory(updatedHistory);
        setIsDropdownOpen(false);
    }

    //clear history
    const handleClearHistory = () => {
        Cookies.remove('searchHistory');
        setSearchHistory([]);
    }

    //clear selected history item
    const handleClearSelected = (title: string) => {
        const searchHistory = Cookies.get('searchHistory') || '[]';
        const updatedHistory = JSON.parse(searchHistory);
        const index = updatedHistory.findIndex((item: TSearchHistory) => item.title === title);
        if (index !== -1) {
            updatedHistory.splice(index, 1);
            Cookies.set('searchHistory', JSON.stringify(updatedHistory), { expires: 7, path: '/' });
            setSearchHistory(updatedHistory);
        }
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
                    onFocus={handleSearchFocus}
                />
                {searchQuery && <button onClick={handleClear}><RemoveIcon /></button>}
            </div>
            {isDropdownOpen &&
                <div className={styles.searchBar__dropdown} ref={dropdownRef} onClick={(e) => handleDropdownClick(e)}>
                    {searchList && searchList.length !== 0 &&
                        <div className={styles.searchBar__dropdown__block}>
                            <h4>Search results</h4>
                            {searchList && searchList.length === 0 && <p>Your search did not match any results</p>}
                            <ul>
                                {searchList && searchList.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            onClick={(e) => handleClickLink(e, item.title, item._id)}
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
                        <div className={styles.searchBar__dropdown__block__header}>
                            <h4>History search</h4>
                            {searchHistory && searchHistory.length > 0 &&
                                <button onClick={handleClearHistory}>Clear history</button>
                            }
                        </div>
                        {(!searchHistory || searchHistory.length === 0) && <p>Search history is empty</p>}
                        <ul>
                            {searchHistory && searchHistory.slice(-4).map((item, index) => (
                                <li key={index}>
                                    <Link
                                        onClick={(e) => handleClickLink(e, item.title, item.id)}
                                        to={`/Sandrela/dresses/${item.id}`}
                                    >
                                        {item.title}
                                    </Link>
                                    <button onClick={() => handleClearSelected(item.title)}>
                                        Delete
                                    </button>
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