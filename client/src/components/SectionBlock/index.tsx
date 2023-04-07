import styles from './SectionBlock.module.scss'

type SectionBlockProps = {
    children: React.ReactNode
}

const SectionBlock: React.FC<SectionBlockProps> = ({ children }) => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.section__wrapper}>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default SectionBlock