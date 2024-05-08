import { AlbumConnectionDocument, AlbumInput, useCreateAlbumMutation } from '@/__generated__/graphql'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createAlbumFormSchema = z.object({
    name: z.string().min(1),
})
export type CreateAlbumFormSchemaType = z.infer<typeof createAlbumFormSchema>

export const useCreateAlbum = () => {
    const [mutation, mutationData] = useCreateAlbumMutation()
    const form = useForm<CreateAlbumFormSchemaType>({
        resolver: zodResolver(createAlbumFormSchema),
        defaultValues: {
            name: '',
        },
    })

    const createAlbum = useCallback(
        async (album: AlbumInput) => {
            const res = await mutation({
                variables: {
                    album,
                },
                refetchQueries: [
                    {
                        query: AlbumConnectionDocument,
                        variables: {
                            limit: 1000,
                        },
                    },
                ],
            })
            if (!res.data?.createAlbum?.id) {
                throw new Error('Album is not created')
            }
            form.reset()
        },
        [form, mutation],
    )

    return {
        createAlbum,
        createAlbumMutationData: mutationData,
        createAlbumForm: form,
    } as const
}
