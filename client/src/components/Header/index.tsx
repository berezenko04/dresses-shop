//styles
import styles from './Header.module.scss'

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className="container">
                    <h1>Bridal shop with the possibility of individual tailoring</h1>
                </div>
            </div>
        </header>
    )
}

export default Header