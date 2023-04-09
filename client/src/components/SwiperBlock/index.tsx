import { Navigation, Swiper as SwiperType, SwiperOptions } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'

interface SwiperBlockProps extends SwiperOptions {
    children: React.ReactNode,
    onBeforeInit: () => void
}

const SwiperBlock: React.FC<SwiperBlockProps> = ({ children, onBeforeInit }) => {
    return (
        <div style={{ width: '100%' }}>
            <Swiper
                spaceBetween={32}
                slidesPerView={3.2}
                modules={[Navigation]}
            >
                {children}
            </Swiper>
        </div>
    )
}

export default SwiperBlock