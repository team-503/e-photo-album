import { FormEmailField } from '@/components/form/form-email-field'
import { FormPasswordField } from '@/components/form/form-password-field'
import { FormSubmitButton } from '@/components/form/form-submit-button'
import { PageWrapper } from '@/components/page-wrapper'
import { Muted } from '@/components/typography/muted'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { UrlConfig } from '@/config/url.config'
import { AuthCard } from '@/pages/auth/components/auth-card'
import { LoginFormSchemaType, useLogin } from '@/pages/auth/hooks/use-login'
import { memo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type LoginPageProps = unknown
export const LoginPage: React.FC<LoginPageProps> = memo(() => {
    const { login, loginMutatoinData, loginForm } = useLogin()
    const navigate = useNavigate()

    const onSubmit = useCallback(
        async (values: LoginFormSchemaType) => {
            try {
                login({
                    email: values.email,
                    password: values.password,
                })
                toast.success('Log in successful')
                navigate(UrlConfig.app.url)
            } catch (error) {
                toast.error('Unknow error occurred!')
            }
        },
        [login, navigate],
    )

    return (
        <PageWrapper
            breadcrumbs={[UrlConfig.main, UrlConfig.login]}
            className="my-auto flex h-[var(--h-screen)] items-center justify-center"
        >
            <AuthCard>
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                    <CardDescription>Log in your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormEmailField control={loginForm.control} name="email" />
                            <FormPasswordField control={loginForm.control} name="password" />
                            <FormSubmitButton type="submit" isLoading={loginMutatoinData.loading}>
                                Log in
                            </FormSubmitButton>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <Muted>
                        Don't have an account?{' '}
                        <Link to={UrlConfig.register.url} className="underline">
                            Register
                        </Link>
                    </Muted>
                </CardFooter>
            </AuthCard>
        </PageWrapper>
    )
})
LoginPage.displayName = 'LoginPage'
