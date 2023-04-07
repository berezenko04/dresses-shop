import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";

//styles
import styles from './Home.module.scss'

//components
import SectionBlock from '../../components/SectionBlock';

const Home: React.FC = () => {
    const achievements = [
        { count: 1000, desc: 'Different dresses' },
        { count: 10000, desc: 'Sold dresses' },
        { count: 10000, desc: 'Satisfied customers' }
    ];

    return (
        <div className={styles.page}>
            <SectionBlock>
                <h2>Achievement</h2>
                <ul className={styles.achievement__list}>
                    {achievements.map((achievement, index) => (
                        <li key={index}>
                            <span>{achievement.count}+</span>
                            <p>{achievement.desc}</p>
                        </li>
                    ))}
                </ul>
            </SectionBlock>
            <SectionBlock>
                <h2>Types of dresses</h2>
                <ul className={styles.dresses__list}>
                    {[...Array(6)].map((_, index) => (
                        <li key={index}>
                            <Link to="/" className={styles.dresses__list__item}>
                                <img src={`categories/${index + 1}.jpg`} alt="" />
                                <h4>Lush Dresses</h4>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SectionBlock>
            <SectionBlock>
                <h2>The Most Popular Dresses</h2>
                <Swiper>
                    
                </Swiper>
            </SectionBlock>
        </div>
    )
}

export default Home