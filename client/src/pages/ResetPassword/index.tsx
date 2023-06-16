//components
import AuthFormHead from "@/components/AuthFormHead"
import ResetPasswordForm from "@/components/Forms/ResetPasswordForm"
import AuthLayout from "@/layout/AuthLayout"


const ResetPassword: React.FC = () => {
    return (
        <AuthLayout>
            <AuthFormHead
                title="Set new password"
                text="Your new password must be different to previously used passwords."
            />
            <ResetPasswordForm />
        </AuthLayout>
    )
}

export default ResetPassword