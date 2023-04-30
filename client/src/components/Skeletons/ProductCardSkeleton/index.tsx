import styles from './ProductCardSkeleton.module.scss'

const ProductCardSkeleton: React.FC = () => {
    return (
        <div className={styles.skeleton}>
            <div className={styles.skeleton__image} />
            <div className={styles.skeleton__info}>
                <div className={styles.skeleton__info__head}>
                    <div className={styles.skeleton__info__head__title} />
                    <div className={styles.skeleton__info__head__colors} />
                </div>
                <div className={styles.skeleton__info__price} />
            </div>
        </div>
    )
}

export default ProductCardSkeleton