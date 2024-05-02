import { PageWrapper } from '@/components/page-wrapper'
import { Muted } from '@/components/typography/muted'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { UrlConfig } from '@/config/url.config'
import { AuthCard } from '@/pages/auth/components/auth-card'
import { FormEmailField } from '@/pages/auth/components/form-email-field'
import { FormPasswordField } from '@/pages/auth/components/form-password-field'
import { FormSubmitButton } from '@/pages/auth/components/form-submit-button'
import { FormTextField } from '@/pages/auth/components/form-text-field'
import { useRegister } from '@/pages/auth/hooks/use-register'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    fullName: z.string().min(2),
})
type FormSchemaType = z.infer<typeof formSchema>

type RegisterPageProps = unknown
export const RegisterPage: React.FC<RegisterPageProps> = memo(() => {
    const { register, registerMutationData } = useRegister()
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
        },
    })

    const onSubmit = useCallback(
        async (values: FormSchemaType) => {
            try {
                register(UrlConfig.auth.register.url, {
                    email: values.email,
                    password: values.password,
                    fullName: values.fullName,
                })
            } catch (error) {
                toast('Помилка реєстрації, спробуйте пізніше')
            }
        },
        [register],
    )

    return (
        <PageWrapper breadcrumbs={[UrlConfig.main, UrlConfig.auth.register]} className="flex items-center justify-center">
            <AuthCard>
                <CardHeader>
                    <CardTitle>Реєстрація</CardTitle>
                    <CardDescription>Створення нового облікового запису</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                            <FormEmailField control={form.control} name="email" />
                            <FormPasswordField control={form.control} name="password" />
                            <FormTextField control={form.control} name="fullName" title="Повне імʼя" placeholder="John Doe" />
                            <FormSubmitButton type="submit" isLoading={registerMutationData.loading}>
                                Зареєструватись
                            </FormSubmitButton>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <Muted>
                        Вже є акаунт?{' '}
                        <Link to={UrlConfig.auth.login.url} className="underline">
                            Увійти
                        </Link>
                    </Muted>
                </CardFooter>
            </AuthCard>
        </PageWrapper>
    )
})
RegisterPage.displayName = 'RegisterPage'
