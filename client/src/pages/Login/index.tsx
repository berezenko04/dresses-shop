//components
import AuthFormHead from '@/components/AuthFormHead'
import LoginForm from '@/components/Forms/LoginForm'
import AuthLayout from '@/layout/AuthLayout'

const Login: React.FC = () => {
    return (
        <AuthLayout>
            <AuthFormHead
                title='Login an account'
                text='Let’s get started with your 30day free trial.'
            />
            <LoginForm />
        </AuthLayout>
    )
}

export default Login