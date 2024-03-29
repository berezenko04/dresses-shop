import Cards, { Focused } from 'react-credit-cards-2'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ChangeEvent, FocusEvent, useState } from 'react'
import { number } from 'card-validator'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

//styles
import styles from './CreditCardForm.module.scss'
import 'react-credit-cards-2/dist/es/styles-compiled.css'

//components
import AuthField from '../../AuthField'
import Button from '../../Button'

//redux
import { cartSelector } from '@/redux/cart/selectors'
import { makeOrder } from '@/redux/orders/asyncActions'
import { clearCart } from '@/redux/cart/slice'
import { userDataSelector } from '@/redux/user/selectors'

//utils
import { formatDate } from '@/utils/formatDate'


interface IPaymentForm {
    fullName: string,
    cardNumber: string,
    expiry: string,
    cvc: string,
    focus: Focused | undefined
}

const CreditCardForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<IPaymentForm>();
    const user = useSelector(userDataSelector);
    const [formValues, setFormValues] = useState<IPaymentForm>({
        fullName: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        focus: undefined
    });

    const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
        const { name } = e.currentTarget;
        setFormValues({ ...formValues, focus: name as Focused });
    }

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { totalPrice, cartItems } = useSelector(cartSelector);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.currentTarget;
        const exp = ['cardNumber', 'expiry', 'cvv'];
        if (exp.includes(name)) {
            value = value.replace(/\D/g, '');
        }
        if (name === exp[1]) {
            value = value.replace(/^(\d{2})(\d{0,2})/, (_, val1, val2) => {
                if (val1 === '00') {
                    return '';
                }
                else {
                    return val1 + (val2 ? '/' + val2 : '');
                }
            });
        }

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const isExpiryValid = (expiry: string): boolean => {
        let valid = true;
        const splitted = expiry.split('/');
        const year = +splitted[1];
        const month = +splitted[0];
        const date = new Date();
        const currentYear = +date.getFullYear().toString().slice(2, 4);
        const currentMonth = +(date.getMonth() + 1).toString().padStart(2, '0');

        if (year < currentYear) {
            valid = false;
        } else if (year === currentYear && month < currentMonth) {
            valid = false;
        }

        return valid;
    }

    const onSubmit: SubmitHandler<IPaymentForm> = (data) => {
        if (user?.address) {
            dispatch(makeOrder({
                paymentMethod: data.cardNumber,
                date: formatDate(new Date().toString()),
                subTotal: totalPrice,
                discount: 0,
                products: cartItems,
                shipmentCost: 1200
            }));
            dispatch(clearCart());
            navigate(`/order-success`);
            window.scrollTo(0, 0);
        } else {
            toast.error('Please set your shipping address');
        }
    }

    return (
        <div className={styles.credit}>
            <form className={styles.credit__form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.credit__form__block}>
                    <AuthField
                        title='Full Name'
                        type='text'
                        placeholder='Enter full name'
                        value={formValues.fullName}
                        onFocus={handleInputFocus}
                        error={Boolean(errors.fullName)}
                        {...register('fullName', {
                            required: true,
                            minLength: 8,
                            maxLength: 18,
                            onChange: handleChange,
                            pattern: {
                                value: /[a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]+/,
                                message: "Invalid full name."
                            }
                        })}
                    />
                    {errors.fullName?.type === "required" && (
                        <span>Full name is required.</span>
                    )}
                    {errors.fullName?.type === "minLength" && (
                        <span>Full name must be at least 8 characters.</span>
                    )}
                    {errors.fullName?.type === "maxLength" && (
                        <span>Full name must be less than 18 characters.</span>
                    )}
                    {errors.fullName?.type === "pattern" && (
                        <span>Invalid full name.</span>
                    )}
                </div>
                <div className={styles.credit__form__block}>
                    <AuthField
                        type='text'
                        title='Card Number'
                        inputMode='numeric'
                        maxLength={19}
                        placeholder='Enter card number'
                        onFocus={handleInputFocus}
                        error={Boolean(errors.cardNumber)}
                        value={
                            formValues.cardNumber
                                .replace(/\s/g, "")
                                .replace(/(\d{4})(?=\d)/g, '$1 ')
                                .trim()
                        }
                        {...register('cardNumber', {
                            required: true,
                            onChange: handleChange,
                            minLength: 19,
                        })}
                    />
                    {errors.cardNumber?.type === 'required' && <span>Card number is required</span>}
                    {formValues.cardNumber.length === 16 && !number(formValues.cardNumber).isValid && <span>Invalid card number</span>}
                </div>
                <div className={styles.credit__form__footer}>
                    <div className={styles.credit__form__block}>
                        <AuthField
                            title='Expiration Date'
                            type='text'
                            maxLength={5}
                            placeholder='01/10'
                            onFocus={handleInputFocus}
                            error={Boolean(errors.expiry) || isExpiryValid(formValues.expiry) === false}
                            value={formValues.expiry}
                            {...register('expiry', {
                                required: true,
                                onChange: handleChange,
                                minLength: 5
                            })}
                        />
                    </div>
                    <div className={styles.credit__form__block}>
                        <AuthField
                            title='CVV Number'
                            type='password'
                            placeholder='***'
                            maxLength={3}
                            onFocus={handleInputFocus}
                            error={Boolean(errors.cvc)}
                            value={formValues.cvc}
                            {...register('cvc', {
                                required: true,
                                onChange: handleChange,
                                min: 3,
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Invalid CVV"
                                }
                            })}
                        />
                    </div>
                </div>
                <Button
                    theme='primary'
                    size='sm'
                    disabled={!isValid || !isExpiryValid(formValues.expiry) || !number(formValues.cardNumber).isValid}
                >
                    Place order
                </Button>
            </form>
            <Cards
                cvc={formValues.cvc}
                name={formValues.fullName}
                expiry={formValues.expiry}
                number={formValues.cardNumber}
                focused={formValues.focus}
            />
        </div>
    )
}

export default CreditCardForm