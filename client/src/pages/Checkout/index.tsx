import { useSelector } from 'react-redux'
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

//styles
import styles from './Checkout.module.scss'

//components
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import ShippingInfo from '@/components/ShippingInfo';
import Radio from '@/components/Radio';
import AuthField from '@/components/AuthField';
import CartEmptyState from '@/components/CartEmptyState';
import TotalPrice from '@/components/TotalPrice';

//redux
import { cartSelector } from '@/redux/cart/selectors';
import { userDataSelector } from '@/redux/user/selectors';

//icons
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg'
import { ReactComponent as PaypalIcon } from '@/assets/icons/paypal.svg'
import { ReactComponent as MCIcon } from '@/assets/icons/mastercard.svg'
import { ReactComponent as VisaIcon } from '@/assets/icons/visa.svg'


interface IPaymentForm {
    fullName: string,
    cardNumber: string,
    expirationDate: string,
    cvv: string,
    paypalAddress?: string
}

const Checkout: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IPaymentForm>();
    const { cartItems } = useSelector(cartSelector);
    const user = useSelector(userDataSelector);
    const [payment, setPayment] = useState('paypal');
    const [formData, setFormData] = useState<IPaymentForm>({
        fullName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });
    const [readableCart, setReadableCart] = useState(true);

    const cartEmpty = cartItems.length <= 0;

    const expression = user?.address !== '' && Object.keys(formData).length === 0;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const onSubmit = (data: IPaymentForm) => {

    }

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.page__wrapper}>
                    <h3>Checkout</h3>
                    <div className={styles.page__main}>
                        <div className={styles.page__main__left}>
                            <ShippingInfo editable />
                            <div className={styles.page__main__left__promo}>
                                <div className={styles.page__main__left__promo__head}>
                                    <h4>Redeem promo code</h4>
                                    <button><PlusIcon /></button>
                                </div>
                            </div>
                            <div className={styles.page__main__left__billing}>
                                <h4>Billing Address</h4>
                                <div className={styles.page__main__left__billing__body}>
                                    <label className={styles.page__main__left__billing__body__item}>
                                        <Radio
                                            title='Paypal'
                                            name='billing'
                                            defaultChecked
                                            onChange={() => setPayment('paypal')}
                                        />
                                        <PaypalIcon />
                                    </label>
                                    <label className={styles.page__main__left__billing__body__item}>
                                        <Radio
                                            title='Credit card'
                                            name='billing'
                                            onChange={() => setPayment('card')}
                                        />
                                        <div>
                                            <MCIcon />
                                            <VisaIcon />
                                        </div>
                                    </label>
                                </div>
                                <form className={styles.page__main__left__billing__form} onSubmit={handleSubmit(onSubmit)}>
                                    {payment === 'paypal' ?
                                        <div className={styles.page__main__left__billing__form__block}>
                                            <AuthField
                                                title='Paypal Address'
                                                error={false}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        :
                                        <>
                                            <div className={styles.page__main__left__billing__form__block}>
                                                <AuthField
                                                    title='Full Name'
                                                    error={false}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className={styles.page__main__left__billing__form__block}>
                                                <AuthField
                                                    title='Card Number'
                                                    error={false}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className={styles.page__main__left__billing__form__footer}>
                                                <div className={styles.page__main__left__billing__form__block}>
                                                    <AuthField
                                                        title='Expiration Date'
                                                        error={false}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className={styles.page__main__left__billing__form__block}>
                                                    <AuthField
                                                        title='CVV Number'
                                                        error={false}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    }
                                </form>
                            </div>
                            <Button
                                theme='primary'
                                size='lg'
                                disabled={expression}
                            >
                                Place order
                            </Button>
                        </div>
                        <div className={styles.page__main__cart}>
                            <div className={styles.page__main__cart__head}>
                                <h3>Cart</h3>
                                {!cartEmpty &&
                                    <button onClick={() => setReadableCart(!readableCart)}>
                                        {readableCart ? 'Edit' : 'Cancel'}
                                    </button>
                                }
                            </div>
                            <div className={styles.page__main__cart__items}>
                                {!cartEmpty ?
                                    cartItems.map((item, index) => (
                                        <CartItem readable={readableCart} cart={item} key={index} />
                                    ))
                                    :
                                    <CartEmptyState />
                                }
                            </div>
                            {!cartEmpty &&
                                <TotalPrice discount={0} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout