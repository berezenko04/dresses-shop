import { Link } from 'react-router-dom';
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
    const help = ['Order Status', 'Shipping and Delivery', 'Returns', 'Payment Options', 'Contact Us'];
    const about = ['News', 'Careers', 'Investors', 'Sustainability'];
    const privacy = ['Terms of Use', 'Terms of Sale', 'Privacy & Cookie Policy', 'Cookie Settings'];

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footer__wrapper}>
                    <div className={styles.footer__main}>
                        <div className={styles.footer__main__col}>
                            <h5>Get help</h5>
                            <ul>
                                {help.map((item, index) => (
                                    <li key={index}><Link to={'/'}>{item}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.footer__main__col}>
                            <h5>About</h5>
                            <ul>
                                {about.map((item, index) => (
                                    <li key={index}><Link to={'/'}>{item}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footer__copyright}>
                        <p>Copyright 2023 Sandrela, All Rights Reserved</p>
                        <ul>
                            {privacy.map((item, index) => (
                                <li key={index}><Link to={'/'}>{item}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer