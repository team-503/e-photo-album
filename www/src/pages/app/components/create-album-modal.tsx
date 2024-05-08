import { FormSubmitButton } from '@/components/form/form-submit-button'
import { FormTextField } from '@/components/form/form-text-field'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { CreateAlbumFormSchemaType, useCreateAlbum } from '@/pages/app/components/hooks/use-create-album'
import { memo, useCallback, useState } from 'react'
import { toast } from 'sonner'

type CreateAlbumModalProps = React.ComponentProps<typeof DialogTrigger>
export const CreateAlbumModal: React.FC<CreateAlbumModalProps> = memo(({ children, ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { createAlbum, createAlbumMutationData, createAlbumForm } = useCreateAlbum()

    const onSubmit = useCallback(
        async (data: CreateAlbumFormSchemaType) => {
            try {
                await createAlbum(data)
                toast.success('Album created')
                setIsOpen(false)
            } catch (error) {
                toast.error('Failed to create album!')
            }
        },
        [createAlbum],
    )

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger {...props}>{children}</DialogTrigger>
            <DialogContent>
                <Form {...createAlbumForm}>
                    <form onSubmit={createAlbumForm.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                        <FormTextField title="Album name" control={createAlbumForm.control} name="name" />
                        <FormSubmitButton type="submit" isLoading={createAlbumMutationData.loading}>
                            Create album
                        </FormSubmitButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
})
CreateAlbumModal.displayName = 'CreateAlbumModal'
