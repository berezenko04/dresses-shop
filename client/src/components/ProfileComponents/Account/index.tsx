import { useState, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '@/redux/store'

//styles
import styles from './Account.module.scss'

//components
import AccountInput from '../AccountInput'
import Button from '@/components/Button'

//icons
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg'
import Radio from '@/components/Radio'
import UploadAvatar from '../UploadAvatar'
import { updateUser } from '@/redux/user/slice'


type AccountProps = {
    name: string,
    lastName: string,
    sex: string,
    avatarUrl: string,
    email: string
}

interface EditFormValues {
    name: string,
    lastName: string,
    email: string,
    sex: 'male' | 'female'
}


const Account: React.FC<AccountProps> = ({ name, lastName, avatarUrl, email, sex }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<EditFormValues>();

    const dispatch = useAppDispatch();

    const [editable, setEditable] = useState(false);
    const [isUploadVisible, setIsUploadVisible] = useState(false);
    const uploadRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (uploadRef.current && !uploadRef.current.contains(e.target as HTMLElement) && isUploadVisible) {
                setIsUploadVisible(false);
                document.body.classList.toggle('overlay-opened');
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isUploadVisible])

    const onSubmit: SubmitHandler<EditFormValues> = (data) => {
        setEditable(false);
        dispatch(updateUser(data));
    }

    const handleVisible = () => {
        setIsUploadVisible(!isUploadVisible);
        document.body.classList.toggle('overlay-opened');
    }


    return (
        <>
            {isUploadVisible &&
                <div className={styles.upload}>
                    <UploadAvatar handleVisible={handleVisible} ref={uploadRef} />
                </div>
            }
            {editable ?
                <div className={styles.edit}>
                    <div className={styles.edit__head}>
                        <div className={styles.edit__head__avatar}>
                            <img src={avatarUrl} alt="" />
                        </div>
                        <div className={styles.edit__head__info}>
                            <button onClick={handleVisible}>Change photo profile</button>
                            <p>Your photo must be less than 2 MB</p>
                        </div>
                    </div>
                    <div className={styles.edit__profile}>
                        <h4>Profile information</h4>
                        <form action="" className={styles.edit__profile__form} onSubmit={handleSubmit(onSubmit)}>
                            <AccountInput
                                type='text'
                                title='First Name'
                                defaultValue={name}
                                error={Boolean(errors.name)}
                                {...register("name", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                })}
                            />
                            <AccountInput
                                type='text'
                                title='Last Name'
                                defaultValue={lastName}
                                error={Boolean(errors.lastName)}
                                {...register("lastName", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                })}
                            />
                            <AccountInput
                                type='email'
                                title='Email'
                                defaultValue={email}
                                error={Boolean(errors.email)}
                                {...register("email", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                })}
                            />
                            <div className={styles.edit__profile__form__sex}>
                                <label>Sex</label>
                                <div className={styles.edit__profile__form__sex__radio}>
                                    <Radio title='Male' {...register("sex")} defaultChecked />
                                    <Radio title='Female' {...register("sex")} />
                                </div>
                            </div>
                            <Button type='submit' theme='primary' size='sm'>Save Profile</Button>
                        </form>
                    </div>
                </div> :
                <div className={styles.account} >
                    <div className={styles.account__head}>
                        <div className={styles.account__head__avatar}>
                            <img src={avatarUrl} alt="" />
                        </div>
                        <h3>{`${name} ${lastName}`}</h3>
                        <button onClick={() => setEditable(true)}><EditIcon /></button>
                    </div>
                    <div className={styles.account__info}>
                        <h3>Profile information</h3>
                        <div className={styles.account__info__list}>
                            <p>E-mail: {email}</p>
                            <p>Sex: {sex}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Account