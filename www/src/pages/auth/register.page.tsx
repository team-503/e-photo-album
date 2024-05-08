import { FormEmailField } from '@/components/form/form-email-field'
import { FormPasswordField } from '@/components/form/form-password-field'
import { FormSubmitButton } from '@/components/form/form-submit-button'
import { PageWrapper } from '@/components/page-wrapper'
import { Muted } from '@/components/typography/muted'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { UrlConfig } from '@/config/url.config'
import { AuthCard } from '@/pages/auth/components/auth-card'
import { RegisterFormSchemaType, useRegister } from '@/pages/auth/hooks/use-register'
import { memo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type RegisterPageProps = unknown
export const RegisterPage: React.FC<RegisterPageProps> = memo(() => {
    const { register, registerMutationData, registerForm } = useRegister()
    const navigate = useNavigate()

    const onSubmit = useCallback(
        async (values: RegisterFormSchemaType) => {
            try {
                register({
                    email: values.email,
                    password: values.password,
                })
                toast.success('Registration successful')
                navigate(UrlConfig.app.url)
            } catch (error) {
                toast.error('Unknow error occurred!')
            }
        },
        [navigate, register],
    )

    return (
        <PageWrapper breadcrumbs={[UrlConfig.main, UrlConfig.register]} className="my-auto flex items-center justify-center">
            <AuthCard>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Create new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormEmailField control={registerForm.control} name="email" />
                            <FormPasswordField control={registerForm.control} name="password" />
                            <FormSubmitButton type="submit" isLoading={registerMutationData.loading}>
                                Register
                            </FormSubmitButton>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <Muted>
                        Already have an account?{' '}
                        <Link to={UrlConfig.login.url} className="underline">
                            Log in
                        </Link>
                    </Muted>
                </CardFooter>
            </AuthCard>
        </PageWrapper>
    )
})
RegisterPage.displayName = 'RegisterPage'
