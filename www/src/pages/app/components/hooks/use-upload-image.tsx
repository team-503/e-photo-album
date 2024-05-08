import { ImageConnectionDocument, ImageInput, useUploadImageMutation } from '@/__generated__/graphql'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB

const uploadImageFormSchema = z.object({
    location: z.string().min(1),
    image: z
        .instanceof(File)
        .refine(file => file.size > 1, 'Image is too small')
        .refine(file => file.size < MAX_FILE_SIZE, 'Image is too large. Max size is 50 MB')
        .refine(file => file.type.includes('image/'), 'File is not an image')
        .optional(),
})
export type UploadImageFormSchemaType = z.infer<typeof uploadImageFormSchema>

export const useUploadImage = () => {
    const [mutation, mutationData] = useUploadImageMutation()
    const form = useForm<UploadImageFormSchemaType>({
        resolver: zodResolver(uploadImageFormSchema),
        defaultValues: {},
    })

    const uploadImage = useCallback(
        async (image: ImageInput) => {
            const res = await mutation({
                variables: {
                    image,
                },
                refetchQueries: [
                    {
                        query: ImageConnectionDocument,
                        variables: {
                            limit: 1000,
                        },
                    },
                ],
            })
            if (!res.data?.uploadImage?.id) {
                throw new Error('Image is not uploaded')
            }
            form.reset()
        },
        [form, mutation],
    )

    return {
        uploadImage,
        uploadImageMutationData: mutationData,
        uploadImageForm: form,
    } as const
}
