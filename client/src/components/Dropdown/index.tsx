import React, { HTMLAttributes, useState } from 'react'

//styles
import styles from './Dropdown.module.scss'

//icons
import { ReactComponent as DropdownIcon } from '@/assets/icons/arrow-dropdown.svg'

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
    title: string,
    children: React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <div className={styles.dropdown}>
            <button className={styles.dropdown__button} onClick={() => setOpened(!opened)}>
                <span>{title}</span>
                <DropdownIcon className={opened ? styles.icon__active : ''} />
            </button>
            {opened &&
                <div className={styles.dropdown__content}>
                    {children}
                </div>
            }
        </div>
    )
}

export default Dropdown