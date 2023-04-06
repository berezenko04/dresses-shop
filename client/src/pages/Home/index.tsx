//styles
import styles from './Home.module.scss'

//components


const Home: React.FC = () => {
    const achievements = [
        { count: 1000, desc: 'Different dresses' },
        { count: 10000, desc: 'Sold dresses' },
        { count: 10000, desc: 'Satisfied customers' }
    ];
    return (
        <div className={styles.page}>
            <section className={styles.achievement}>
                <div className="container">
                    <div className={styles.achievement__wrapper}>
                        <h2>Achievement</h2>
                        <ul>
                            {achievements.map((achievement, index) => (
                                <li key={index}>
                                    <span>{achievement.count}+</span>
                                    <p>{achievement.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
            <section className={styles.dresses}>
                <div className="container">
                    <div className={styles.dresses__wrapper}>
                        <h2>Types of dresses</h2>
                        <ul>
                            {achievements.map((achievement, index) => (
                                <li key={index}>
                                    <span>{achievement.count}+</span>
                                    <p>{achievement.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home