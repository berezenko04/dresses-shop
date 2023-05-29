import styles from './CommentSkeleton.module.scss'

const CommentSkeleton = () => {
    return (
        <div className={styles.comment}>
            <div className={styles.comment__head}>
                <div className={styles.comment__head__avatar} />
                <div className={styles.comment__head__rating}>
                    <div className={styles.comment__head__rating__stars} />
                    <div className={styles.comment__head__rating__user} />
                </div>
            </div>
            <div className={styles.comment__text} />
            <div className={styles.comment__date} />
        </div>
    )
}

export default CommentSkeleton