import { AlbumType, ImageType } from '@/__generated__/graphql'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { UrlConfigApi } from '@/config/url.config'
import { memo } from 'react'

type ImageCardModalProps = React.ComponentProps<typeof Dialog> & {
    image: ImageType
    album?: AlbumType
}
export const ImageCardModal: React.FC<ImageCardModalProps> = memo(({ image, album, children, ...props }) => {
    return (
        <Dialog>
            <DialogTrigger {...props}>{children}</DialogTrigger>
            <DialogContent className="max-w-fit">
                <img
                    src={UrlConfigApi.image.getDynamicUrl(image.id)}
                    alt="Image"
                    className="h-full max-h-full w-full max-w-full rounded-md"
                />
            </DialogContent>
        </Dialog>
    )
})
ImageCardModal.displayName = 'ImageCardModal'
