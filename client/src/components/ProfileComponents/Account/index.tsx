//styles
import styles from './Account.module.scss'

//icons
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg'

type AccountProps = {
    fullName: string,
    avatarUrl: string,
    email: string
}


const Account: React.FC<AccountProps> = ({ fullName, avatarUrl, email }) => { 

    return (
        <div className={styles.account}>
            <div className={styles.account__head}>
                <div className={styles.account__head__avatar}>
                    <img src={avatarUrl} alt="" />
                </div>
                <h3>{fullName}</h3>
                <button><EditIcon /></button>
            </div>
            <div className={styles.account__info}>
                <h3>Profile information</h3>
                <div className={styles.account__info__list}>
                    <p>E-mail: {email}</p>
                    <p>Sex: male</p>
                </div>
            </div>
        </div>
    )
}

export default Account