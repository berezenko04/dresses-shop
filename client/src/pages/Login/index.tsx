//components
import AuthFormHead from '@/components/AuthFormHead'
import LoginForm from '@/components/Forms/LoginForm'
import MetaHead from '@/components/MetaHead'
import AuthLayout from '@/layout/AuthLayout'

const Login: React.FC = () => {
    return (
        <AuthLayout>
            <MetaHead
                title='Login'
                desc="Log in to Sandrela and access your enchanting world of extraordinary products and services."
            />
            <AuthFormHead
                title='Login an account'
                text='Let’s get started with your 30day free trial.'
            />
            <LoginForm />
        </AuthLayout>
    )
}

export default Login