import AuthFormHead from '@/components/AuthFormHead'

//components
import RegistrationForm from '@/components/RegistrationForm'
import AuthLayout from '@/layout/AuthLayout'

const Register: React.FC = () => {
    return (
        <AuthLayout>
            <AuthFormHead
                title='Create an account'
                text='Let’s get started with your 30day free trial.'
            />
            <RegistrationForm />
        </AuthLayout >
    )
}

export default Register