import { LoginInput, useLoginMutation } from '@/__generated__/graphql'
import { useUserStore } from '@/modules/user/stores/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>

export const useLogin = () => {
    const [mutation, mutationData] = useLoginMutation()
    const signIn = useSignIn()
    const setUser = useUserStore(state => state.setUser)
    const form = useForm<LoginFormSchemaType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const login = useCallback(
        async (user: LoginInput) => {
            const res = await mutation({
                variables: {
                    user,
                },
            })
            if (!res.data?.login?.token || !res.data?.login?.user) {
                throw new Error('Token/user is not provided')
            }
            signIn({
                auth: {
                    token: res.data.login.token,
                    type: 'Bearer',
                },
            })
            setUser(res.data.login.user)
            form.reset()
        },
        [form, mutation, setUser, signIn],
    )

    return {
        login,
        loginMutatoinData: mutationData,
        loginForm: form,
    } as const
}
