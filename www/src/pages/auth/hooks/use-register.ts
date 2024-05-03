import { RegisterInput, useRegisterMutation } from '@/__generated__/graphql'
import { useUserStore } from '@/modules/user/stores/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>

export const useRegister = () => {
    const [mutation, mutationData] = useRegisterMutation()
    const signIn = useSignIn()
    const setUser = useUserStore(state => state.setUser)
    const form = useForm<RegisterFormSchemaType>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const register = useCallback(
        async (user: RegisterInput) => {
            const res = await mutation({
                variables: {
                    user,
                },
            })
            if (!res.data?.register?.token || !res.data?.register?.user) {
                throw new Error('Token/user is not provided')
            }
            signIn({
                auth: {
                    token: res.data.register.token,
                    type: 'Bearer',
                },
            })
            setUser(res.data.register.user)
        },
        [mutation, setUser, signIn],
    )

    return {
        register,
        registerMutationData: mutationData,
        registerForm: form,
    } as const
}
