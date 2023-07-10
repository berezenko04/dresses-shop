import { Link } from 'react-router-dom';

//styles
import styles from './Footer.module.scss'

//components
import Logo from '../Logo';

//icons
import { ReactComponent as FacebookIcon } from '@/assets/icons/socials/facebook.svg'
import { ReactComponent as TwitterIcon } from '@/assets/icons/socials/twitter.svg'
import { ReactComponent as InstagramIcon } from '@/assets/icons/socials/instagram.svg'
import { ReactComponent as LinkedinIcon } from '@/assets/icons/socials/linkedin.svg'
import { ReactComponent as TiktokIcon } from '@/assets/icons/socials/tiktok.svg'
import { ReactComponent as TelegramIcon } from '@/assets/icons/socials/telegram.svg'
import { ReactComponent as GooglePlayIcon } from '@/assets/icons/socials/google-play.svg'
import { ReactComponent as AppStoreIcon } from '@/assets/icons/socials/app-store.svg'

const Footer: React.FC = () => {
    const help = ['Order Status', 'Shipping and Delivery', 'Returns', 'Payment Options', 'Contact Us'];
    const about = ['News', 'Careers', 'Investors', 'Sustainability'];
    const privacy = ['Terms of Use', 'Terms of Sale', 'Privacy & Cookie Policy', 'Cookie Settings'];
    const socials = [
        <FacebookIcon />, <TwitterIcon />,
        <InstagramIcon />, <LinkedinIcon />,
        <TiktokIcon />, <TelegramIcon />
    ]

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footer__wrapper}>
                    <div className={styles.footer__main}>
                        <div className={styles.footer__main__info}>
                            <Logo variant='light' />
                            <div className={styles.footer__main__info__socials}>
                                {socials.map((social, index) => (
                                    <Link to='#' key={index}>{social}</Link>
                                ))}
                            </div>
                            <Link to='#'><GooglePlayIcon /></Link>
                            <Link to='#'><AppStoreIcon /></Link>
                        </div>
                        <div className={styles.footer__main__col}>
                            <h4>Get help</h4>
                            <ul>
                                {help.map((item, index) => (
                                    <li key={index}><Link to={'#'}>{item}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.footer__main__col}>
                            <h4>About</h4>
                            <ul>
                                {about.map((item, index) => (
                                    <li key={index}><Link to={'#'}>{item}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.footer__main__col}>
                            <h4>Contacts</h4>
                            <ul>
                                <li>
                                    <a
                                        target='_blank'
                                        href='mailto:romanberezenko8@gmail.com'
                                        rel='noopener noreferrer'
                                    >
                                        romanberezenko8@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target='_blank'
                                        href='https://goo.gl/maps/fE8j27yjGURGzTst8'
                                        rel='noopener noreferrer'
                                    >
                                        Poltava city, Kovalya 5
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target='_blank'
                                        href='tel:380662284162'
                                        rel='noopener noreferrer'
                                    >
                                        +380662284162
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footer__copyright}>
                        <p>Copyright 2023 Sandrela, All Rights Reserved</p>
                        <ul>
                            {privacy.map((item, index) => (
                                <li key={index}><Link to={'#'}>{item}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer