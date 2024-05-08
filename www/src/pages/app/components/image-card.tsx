import { AlbumType, ImageType } from '@/__generated__/graphql'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { UrlConfigApi } from '@/config/url.config'
import { ImageCardContextMenu } from '@/pages/app/components/image-card-context-menu'
import { ImageCardModal } from '@/pages/app/components/image-card-modal'
import { cn } from '@/utils/cn'
import { elipsis } from '@/utils/elipsis'
import { Image } from 'lucide-react'
import moment from 'moment'
import { memo } from 'react'

type ImageCardProps = React.ComponentProps<typeof Card> & {
    image: ImageType
    album?: AlbumType
}
export const ImageCard: React.FC<ImageCardProps> = memo(({ image, album, className, ...props }) => {
    return (
        <ImageCardContextMenu image={image} album={album}>
            <Card className={cn('overflow-hidden', className)} {...props}>
                <CardHeader className="px-3 py-3">
                    <CardDescription className="flex w-full items-center justify-start gap-2 text-foreground">
                        <Image className="h-4 w-4" />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span className="overflow-hidden text-ellipsis">{elipsis(15, image.fileName)}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {image.fileName}, {moment(new Date(Number(image.createdAt))).format('MM.DD.YYYY, HH:mm')}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-2 pb-2">
                    <ImageCardModal image={image} album={album}>
                        <img
                            src={UrlConfigApi.imagePreview.getDynamicUrl(image.id)}
                            alt="Image"
                            className="aspect-square w-full rounded-md object-cover"
                        />
                    </ImageCardModal>
                </CardContent>
            </Card>
        </ImageCardContextMenu>
    )
})
ImageCard.displayName = 'ImageCard'
