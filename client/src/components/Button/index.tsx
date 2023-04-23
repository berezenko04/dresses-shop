import React, { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

import styles from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    theme: 'primary' | 'secondary' | 'tertiary',
    size: 'sm' | 'lg'
}

const Button: React.FC<ButtonProps> = ({ children, theme, size, ...props }) => {

    const themes = cn(styles.button, {
        [styles.button__primary]: theme === 'primary',
        [styles.button__secondary]: theme === 'secondary',
        [styles.button__tertiary]: theme === 'tertiary'
    })

    const sizes = cn(styles.button, {
        [styles.button__sm]: size === 'sm',
        [styles.button__lg]: size === 'lg'
    })

    return (
        <button className={`${themes} ${sizes}`} {...props}>
            {children}
        </button>
    )
}

export default Button
