import { useRef } from 'react'
import { Swiper } from 'swiper/react'
import { Navigation, Swiper as SwiperType } from 'swiper'

//styles
import 'swiper/css';
import 'swiper/css/navigation';

type SwiperBlockProps = {
    children: React.ReactNode,
}


const SwiperBlock: React.FC<SwiperBlockProps> = ({ children }) => {

    const swiperRef = useRef<SwiperType>();

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Swiper
                spaceBetween={32}
                slidesPerView={3.2}
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {children}
            </Swiper>
        </div>
    )
}

export default SwiperBlock