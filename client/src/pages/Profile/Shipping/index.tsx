import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@/redux/store'

//styles
import styles from './Shipping.module.scss'

//components
import Button from '@/components/Button'
import AuthField from '@/components/AuthField'
import ShippingInfo from '@/components/ShippingInfo'
import ProfileLayout from '@/layout/ProfileLayout'
import MetaHead from '@/components/MetaHead'

//redux
import { updateUserAsync } from '@/redux/user/asyncActions'


type TShippingFormValues = { 
    country: string,
    city: string,
    address: string
}

const Shipping: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TShippingFormValues>();
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<TShippingFormValues> = async (data) => {
        try {
            const { country, city, address } = data;
            const newData = { address: `${country}, ${city}, ${address}` };
            dispatch(updateUserAsync(newData));
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while')
        }
    }
    return (
        <div className={styles.shipping}>
            <MetaHead
                title='Shipping'
                desc='Learn about our shipping options at Sandrela. View and manage your orders while experiencing the wonder of our enchanting and extraordinary products and services.'
            />
            <ProfileLayout>
                <div className={styles.shipping__wrapper}>
                    <div className={styles.shipping__head}>
                        <h3>Shipping Address</h3>
                        <ShippingInfo />
                    </div>
                    <form className={styles.shipping__edit} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.shipping__edit__fields}>
                            <AuthField
                                title='Country'
                                placeholder='Enter the country'
                                type='text'
                                {...register("country", { required: true, pattern: /^[A-Za-z]+$/, minLength: 4, maxLength: 13 })}
                                error={!!errors.country}
                            />
                            <AuthField
                                title='City'
                                placeholder='Enter the city'
                                type='text'
                                {...register("city", { required: true, pattern: /^[A-Za-z]+$/, minLength: 3, maxLength: 18 })}
                                error={!!errors.city}
                            />
                            <AuthField
                                title='Address'
                                placeholder='Enter the address'
                                type='text'
                                {...register("address", { required: true, minLength: 5, maxLength: 40 })}
                                error={!!errors.address}
                            />
                        </div>
                        <Button theme='primary' size='sm'>Save Changes</Button>
                    </form>
                </div>
            </ProfileLayout>
        </div>
    )
}

export default Shipping