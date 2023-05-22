import styles from './Switch.module.scss'

const Switch: React.FC = () => {
    return (
        <label className={styles.switch}>
            <input type="checkbox" />
            <span className={`${styles.switch__slider} ${styles.round}`}></span>
        </label>
    )
}

export default Switch