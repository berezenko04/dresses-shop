import AuthFormHead from '@/components/AuthFormHead'

//components
import RegistrationForm from '@/components/Forms/RegistrationForm'
import MetaHead from '@/components/MetaHead'
import AuthLayout from '@/layout/AuthLayout'

const Register: React.FC = () => {
    return (
        <AuthLayout>
            <MetaHead
                title='Register'
                desc='Join Sandrela and experience the wonder of our enchanting and extraordinary products and services. Register now to embark on a journey of elegance and make your life magical today!'
            />
            <AuthFormHead
                title='Create an account'
                text='Let’s get started with your 30day free trial.'
            />
            <RegistrationForm />
        </AuthLayout >
    )
}

export default Register