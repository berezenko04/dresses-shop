//components
import AuthFormHead from "@/components/AuthFormHead"
import ResetPasswordForm from "@/components/Forms/ResetPasswordForm"
import MetaHead from "@/components/MetaHead"
import AuthLayout from "@/layout/AuthLayout"


const ResetPassword: React.FC = () => {
    return (
        <AuthLayout>
            <MetaHead
                title='Reset Password'
                desc='Forgot your password? No worries! Reset your password now at Sandrela and experience the wonder of our enchanting and extraordinary products and services.'
            />
            <AuthFormHead
                title="Set new password"
                text="Your new password must be different to previously used passwords."
            />
            <ResetPasswordForm />
        </AuthLayout>
    )
}

export default ResetPassword