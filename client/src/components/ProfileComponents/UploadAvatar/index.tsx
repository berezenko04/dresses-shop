import { forwardRef, useState, ChangeEvent } from 'react'
import { useAppDispatch } from '@/redux/store';
import { toast } from 'react-toastify';

//styles
import styles from './UploadAvatar.module.scss'

//API
import { uploadFile } from '@/API/userService';
import { updateUserAsync } from '@/redux/user/asyncActions';


type TUploadAvatarProps = {
    handleVisible: () => void,
    ref?: React.ForwardedRef<HTMLDivElement>;
}

const UploadAvatar = forwardRef<HTMLDivElement, TUploadAvatarProps>(({ handleVisible }, ref) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState(false);

    const dispatch = useAppDispatch();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file && file.size > 2 * 1024 * 1024) {
            setError(true);
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(file ? URL.createObjectURL(file) : null);
        setError(false);
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await uploadFile(formData);
            const newPath = response.url;

            dispatch(updateUserAsync({ avatarUrl: newPath }));
            handleVisible();
        } catch (err) {
            console.log(err);
            toast.error('Failed to upload image');
        }
    };

    const handleDeletePhoto = async () => {
        dispatch(updateUserAsync({ avatarUrl: '/default-avatar.png' }));
        handleVisible();
    }


    return (
        <div className={styles.upload} ref={ref}>
            <form className={styles.upload__form} encType="multipart/form-data" onSubmit={onSubmit}>
                <p className={styles.upload__form__heading}>Change photo profile</p>
                {previewUrl ?
                    <div className={styles.upload__form__preview}>
                        <img src={previewUrl} alt="preview" />
                    </div>
                    :
                    <label>
                        <input
                            type="file"
                            name='image'
                            accept="image/png, image/jpg, image/jpeg, image/webp"
                            onChange={handleFileChange}
                        />
                        <p>Upload photo</p>
                        <span>Drag your photo or click browse</span>
                    </label>
                }
                {error && <p className={styles.upload__form__error}>File should be at least 2MB</p>}
                <div className={styles.upload__form__buttons}>
                    {selectedFile ?
                        <button type='submit'>Save</button>
                        :
                        <button type='button' onClick={handleDeletePhoto}>Delete Photo</button>
                    }
                    <button onClick={handleVisible} type='button'>Cancel</button>
                </div>
            </form>
        </div>
    )
})

export default UploadAvatar