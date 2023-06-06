import React, { HTMLAttributes } from 'react'

import styles from './SectionBlock.module.scss'

interface ISectionBlockProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const SectionBlock: React.FC<ISectionBlockProps> = ({ children, ...props }) => {
    return (
        <section className={styles.section} {...props}>
            <div className="container">
                <div className={styles.section__wrapper}>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default SectionBlock