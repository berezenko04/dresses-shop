import { useState, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '@/redux/store'
import { useSelector } from 'react-redux'

//styles
import styles from './Account.module.scss'

//components
import AuthField from '@/components/AuthField'
import UploadAvatar from '@/components/ProfileComponents/UploadAvatar'
import Button from '@/components/Button'
import Radio from '@/components/Radio'
import ProfileLayout from '@/layout/ProfileLayout'

//icons
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg'

//redux
import { userDataSelector } from '@/redux/user/selectors'
import { updateUserAsync } from '@/redux/user/asyncActions'


interface IEditFormValues {
    name: string,
    lastName: string,
    email: string,
    sex: 'male' | 'female'
}

const Account: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IEditFormValues>();

    const dispatch = useAppDispatch();
    const data = useSelector(userDataSelector);
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

    const onSubmit: SubmitHandler<IEditFormValues> = (data) => {
        setEditable(false);
        dispatch(updateUserAsync(data));
    }

    const handleVisible = () => {
        setIsUploadVisible(!isUploadVisible);
        setEditable(!editable);
        document.body.classList.toggle('overlay-opened');
    }

    return (
        <div className={styles.account}>
            <ProfileLayout>
                <>
                    {isUploadVisible &&
                        <div className={styles.account__upload}>
                            <UploadAvatar handleVisible={handleVisible} ref={uploadRef} />
                        </div>
                    }
                    {editable ?
                        <div className={styles.account__edit}>
                            <div className={styles.account__edit__head}>
                                <div className={styles.account__edit__head__avatar}>
                                    <img src={data?.avatarUrl} alt="" />
                                </div>
                                <div className={styles.account__edit__head__info}>
                                    <button onClick={handleVisible}>Change photo profile</button>
                                    <p>Your photo must be less than 2 MB</p>
                                </div>
                            </div>
                            <div className={styles.account__edit__profile}>
                                <h4>Profile information</h4>
                                <form className={styles.account__edit__profile__form} onSubmit={handleSubmit(onSubmit)}>
                                    <AuthField
                                        type='text'
                                        title='First Name'
                                        defaultValue={data?.name}
                                        error={Boolean(errors.name)}
                                        {...register("name", {
                                            required: true,
                                            minLength: 3,
                                            maxLength: 50,
                                            pattern: {
                                                value: /^[a-zA-Zа-яА-Я]+$/,
                                                message: "Invalid name."
                                            }
                                        })}
                                    />
                                    <AuthField
                                        type='text'
                                        title='Last Name'
                                        defaultValue={data?.lastName}
                                        error={Boolean(errors.lastName)}
                                        {...register("lastName", {
                                            required: true,
                                            minLength: 3,
                                            maxLength: 50,
                                            pattern: {
                                                value: /^[a-zA-Zа-яА-Я]+$/,
                                                message: "Invalid last name."
                                            }
                                        })}
                                    />
                                    <AuthField
                                        type='email'
                                        title='Email'
                                        defaultValue={data?.email}
                                        error={Boolean(errors.email)}
                                        readOnly
                                        {...register("email", {
                                            required: true,
                                            minLength: 3,
                                            maxLength: 50,
                                        })}
                                    />
                                    <div className={styles.account__edit__profile__form__sex}>
                                        <label>Sex</label>
                                        <div className={styles.account__edit__profile__form__sex__radio}>
                                            <Radio title='Male' {...register("sex")} defaultChecked />
                                            <Radio title='Female' {...register("sex")} />
                                        </div>
                                    </div>
                                    <Button type='submit' theme='primary' size='sm'>Save Profile</Button>
                                </form>
                            </div>
                        </div> :
                        <div className={styles.account__default} >
                            <div className={styles.account__default__head}>
                                <div className={styles.account__default__head__avatar}>
                                    <img src={data?.avatarUrl} alt="" />
                                </div>
                                <h3>{`${data?.name} ${data?.lastName}`}</h3>
                                <button onClick={() => setEditable(true)}><EditIcon /></button>
                            </div>
                            <div className={styles.account__default__info}>
                                <h3>Profile information</h3>
                                <div className={styles.account__default__info__list}>
                                    <p>E-mail: {data?.email}</p>
                                    <p>Sex: {data?.sex ?
                                        data.sex :
                                        <button onClick={() => setEditable(true)}>edit</button>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                </>
            </ProfileLayout>
        </div>
    )
}

export default Account