import { FormImageField } from '@/components/form/form-image-field'
import { FormLocationField } from '@/components/form/form-location-field'
import { FormSubmitButton } from '@/components/form/form-submit-button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { UploadImageFormSchemaType, useUploadImage } from '@/pages/app/components/hooks/use-upload-image'
import { fileToBase64 } from '@/utils/file-to-base64'
import { memo, useCallback, useState } from 'react'
import { toast } from 'sonner'

type UploadImageModalProps = React.ComponentProps<typeof DialogTrigger>
export const UploadImageModal: React.FC<UploadImageModalProps> = memo(({ children, ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { uploadImage, uploadImageMutationData, uploadImageForm } = useUploadImage()

    const onSubmit = useCallback(
        async (data: UploadImageFormSchemaType) => {
            try {
                if (!data.image) {
                    throw new Error('Image is required')
                }
                const blob = await fileToBase64(data.image)
                if (!blob) {
                    throw new Error('Failed to convert image to base64')
                }
                await uploadImage({
                    blob,
                    fileName: data.image.name,
                    location: data.location,
                })
                toast.success('Image uploaded successfully')
                setIsOpen(false)
            } catch (error) {
                toast.error('Failed to upload image!')
            }
        },
        [uploadImage],
    )

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger {...props}>{children}</DialogTrigger>
            <DialogContent>
                <Form {...uploadImageForm}>
                    <form onSubmit={uploadImageForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                        <FormLocationField control={uploadImageForm.control} name="location" />
                        <FormImageField control={uploadImageForm.control} name="image" />
                        <FormSubmitButton type="submit" isLoading={uploadImageMutationData.loading}>
                            Upload image
                        </FormSubmitButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
})
UploadImageModal.displayName = 'UploadImageModal'
