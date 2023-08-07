import { Link } from 'react-router-dom'
import cn from 'classnames'

//styles
import styles from './Logo.module.scss'


type TLogoProps = {
    variant: 'light' | 'dark',
    handleClick?: () => void
}

const Logo: React.FC<TLogoProps> = ({ variant, handleClick }) => {
    const logoClassName = cn(styles.logo, {
        [styles.logo__light]: variant === 'light',
        [styles.logo__dark]: variant === 'dark',
    })

    return (
        <Link
            to="/"
            className={logoClassName}
            onClick={handleClick}
        >
            Sandrela
        </Link>
    )
}

export default Logo