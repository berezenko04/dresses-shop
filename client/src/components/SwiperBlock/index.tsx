import { Navigation, Swiper as SwiperType } from 'swiper'
import { useState, useRef } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'

//styles
import styles from './SwiperBlock.module.scss'
import 'swiper/css';
import 'swiper/css/navigation';

//components
import SectionBlock from '../SectionBlock'
import ProductCardSmall from '../ProductCardSmall'

//icons
import { ReactComponent as ArrowLeftIcon } from '@/assets/icons/arrow-left.svg'
import { ReactComponent as ArrowRightIcon } from '@/assets/icons/arrow-right.svg'

//redux
import { TProductItem } from '@/redux/products/types'


interface ISwiperBlockProps {
    products: TProductItem[],
    title: string
}


const SwiperBlock: React.FC<ISwiperBlockProps> = ({ products, title }) => {
    const [prevButtonDisabled, setPrevButtonDisabled] = useState<boolean>(true);
    const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(false);

    const swiperRef = useRef<SwiperType>();

    return (
        <SectionBlock>
            <div className={styles.swiperblock}>
                <h2>{title}</h2>
                <div className={styles.swiperblock__controls}>
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        disabled={prevButtonDisabled}
                    >
                        <ArrowLeftIcon />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        disabled={nextButtonDisabled}
                    >
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
            <div style={{ marginRight: '-60px' }}>
                <Swiper
                    spaceBetween={32}
                    slidesPerView={3.2}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={() => {
                        setPrevButtonDisabled(swiperRef.current?.isBeginning!);
                        setNextButtonDisabled(swiperRef.current?.isEnd!);
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCardSmall {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </SectionBlock>
    )
}

export default SwiperBlock