import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { FormEvent, useEffect, useState } from 'react'
import { debounce } from 'lodash'

//styles
import styles from './Sort.module.scss'

//components
import Dropdown from '../Dropdown';
import Button from '../Button';
import MultiRangeSlider from '../MultiRangeSlider';

//icons
import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg'

//redux
import { productsMaxPriceSelector } from '@/redux/products/selectors';
import { fetchProducts } from '@/redux/products/asyncActions';



const Sort: React.FC = () => {
    const dispatch = useAppDispatch();
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState('');
    const [sliderVisible, setSliderVisible] = useState(false);
    const [sliderReset, setSliderReset] = useState(false);

    const maxPrice = useSelector(productsMaxPriceSelector);

    const colors = [
        { name: 'blue', hex: '#82DBF8', lighten: false },
        { name: 'lactic', hex: '#FFF6EE', lighten: true },
        { name: 'white', hex: '#ffffff', lighten: true },
        { name: 'golden', hex: '#FFD66C', lighten: false }
    ];
    const sizes = ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"];

    const handleCheckbox = (e: FormEvent<HTMLInputElement>, setSelectedValues: Function) => {
        const { value, checked } = e.currentTarget;

        setSelectedValues((prevValues: string[]) => {
            if (checked) {
                return [...prevValues, value];
            } else {
                return prevValues.filter((item) => item !== value);
            }
        });
    };

    const handleSizesCheck = (e: FormEvent<HTMLInputElement>) => {
        handleCheckbox(e, setSelectedSizes);
    };

    const handleColorsCheck = (e: FormEvent<HTMLInputElement>) => {
        handleCheckbox(e, setSelectedColors);
    };

    const handleClearFilters = () => {
        setSelectedColors([]);
        setSelectedSizes([]);
        setPriceRange('');
        setSliderReset(true);
    }

    useEffect(() => {
        if (!sliderVisible) {
            return;
        }

        const delayedFetch = debounce(() => {
            dispatch(fetchProducts({
                colors: selectedColors.join(','),
                sizes: selectedSizes.join(','),
                priceRange,
            }));
            setSliderReset(false);
        }, 300);
        delayedFetch();

        return delayedFetch.cancel;
    }, [selectedColors, selectedSizes, priceRange, sliderVisible]);

    return (
        <aside className={styles.sort}>
            <Dropdown title='At a price' className={styles.sort__price}>
                <MultiRangeSlider
                    min={0}
                    max={maxPrice}
                    onSliderVisible={() => setSliderVisible(true)}
                    onChange={({ min, max }) => (setPriceRange(`${min}-${max}`))}
                    reset={sliderReset}
                />
            </Dropdown>
            <Dropdown title='By size' className={styles.sort__sizes}>
                <ul className={styles.sort__sizes__list}>
                    {sizes.map((size, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                name={size}
                                id={size}
                                checked={selectedSizes.includes(size)}
                                onChange={handleSizesCheck}
                                value={size}
                            />
                            <label htmlFor={size}>{size}</label>
                        </li>
                    ))}
                </ul>
            </Dropdown>
            <Dropdown title='By color'>
                <ul className={styles.sort__colors__list}>
                    {colors.map((color, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                id={color.name}
                                name={color.name}
                                checked={selectedColors.includes(color.name)}
                                onChange={handleColorsCheck}
                                value={color.name}
                            />
                            <label htmlFor={color.name}>
                                <div
                                    style={{ backgroundColor: `${color.hex}`, border: `${color.lighten ? '1px solid #e3e3e3' : ''}` }}
                                >
                                    <CheckIcon />
                                </div>
                                {color.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </Dropdown>
            <Button
                size='sm'
                theme='secondary'
                onClick={handleClearFilters}
            >
                Clear Filters
            </Button>
        </aside>
    )
}

export default Sort