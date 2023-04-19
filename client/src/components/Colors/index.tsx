import cn from 'classnames'

//styles
import styles from './Colors.module.scss'

type ColorsProps = {
    colors: string[]
}

const Colors: React.FC<ColorsProps> = ({ colors }) => {

    const getColor = (color: string) => {
        return cn(styles.colors__item__circle__color, {
            [styles.white]: color === 'white',
            [styles.golden]: color === 'golden',
            [styles.blue]: color === 'blue'
        })
    }

    return (
        <div className={styles.colors}>
            {colors && colors.map((color, index) => (
                <div className={styles.colors__item}>
                    <input type="radio" name='color' id={color} defaultChecked={index === 0} />
                    <label htmlFor={color}>
                        <div className={styles.colors__item__circle} key={index}>
                            <div className={getColor(color)} />
                        </div>
                        <span>{color}</span>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default Colors