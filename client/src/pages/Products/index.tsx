import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RangeSlider from 'react-range-slider-input';
//styles
import styles from './Products.module.scss'
import 'react-range-slider-input/dist/style.css';

//components
import Dropdown from '@/components/Dropdown'
import ProductCardExtended from '@/components/ProductCardExtended';

//icons
import { ReactComponent as FilterIcon } from '@/assets/icons/filter.svg'
import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg'

//redux
import { productsLengthSelector, productsSelector } from '@/redux/products/selectors'
import { useAppDispatch } from '@/redux/store'
import { fetchProducts } from '@/redux/products/asyncActions'


const Products: React.FC = () => {
    const sizes = ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"];
    const [sliderValue, setSliderValue] = useState([0, 100]);
    const products = useSelector(productsSelector);
    const colors = [
        { name: 'blue', hex: '#82DBF8', lighten: false },
        { name: 'lactic', hex: '#FFF6EE', lighten: false },
        { name: 'white', hex: '#ffffff', lighten: true },
        { name: 'golden', hex: '#FFD66C', lighten: false }
    ];
    const dispatch = useAppDispatch();
    const productsLength = useSelector(productsLengthSelector);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    return (
        <div className="container">
            <div className={styles.page}>
                <div className={styles.page__head}>
                    <h4>Dresses ({productsLength})</h4>
                    <div className={styles.page__head__sort}>
                        <button>
                            Hide Filters
                            <FilterIcon />
                        </button>
                        <Dropdown title='Sort By'>

                        </Dropdown>
                    </div>
                </div>
                <div className={styles.page__main}>
                    <aside className={styles.page__main__sidebar}>
                        <Dropdown title='At a price' className={styles.page__main__sidebar__price}>
                            <div className={styles.page__main__sidebar__price__wrapper}>
                                <RangeSlider
                                    value={sliderValue}
                                    onChange={(newValue: [number, number]) => setSliderValue(newValue)}
                                    min={0}
                                    max={100}
                                />
                                <div className={styles.page__main__sidebar__price__fields}>
                                    <input
                                        type="number"
                                        id="from"
                                        value={sliderValue[0]}
                                        onChange={(event) =>
                                            setSliderValue([+event.target.value, sliderValue[1]])
                                        }
                                    />
                                    <input
                                        type="number"
                                        id="to"
                                        value={sliderValue[1]}
                                        onChange={(event) =>
                                            setSliderValue([sliderValue[0], +event.target.value])
                                        }
                                    />
                                </div>
                            </div>
                        </Dropdown>
                        <Dropdown title='By size' className={styles.page__main__sidebar__sizes}>
                            <ul className={styles.page__main__sidebar__sizes__list}>
                                {sizes.map((size, index) => (
                                    <li key={index}>
                                        <input type="checkbox" name={size} id={size} />
                                        <label htmlFor={size}>{size}</label>
                                    </li>
                                ))}
                            </ul>
                        </Dropdown>
                        <Dropdown title='By color'>
                            <ul className={styles.page__main__sidebar__colors__list}>
                                {colors.map((color, index) => (
                                    <li key={index}>
                                        <input type="checkbox" name={color.name} id={color.name} />
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
                    </aside>
                    <div className={styles.page__main__content}>
                        {products.map((product) => (
                            <ProductCardExtended key={product.id} {...product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products