import { AlbumType, useImageConnectionQuery } from '@/__generated__/graphql'
import { Muted } from '@/components/typography/muted'
import { ImageCard } from '@/pages/app/components/image-card'
import { cn } from '@/utils/cn'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Loader2 } from 'lucide-react'
import { memo } from 'react'

type ImageGalleryProps = React.ComponentProps<'div'> & {
    album?: AlbumType
}
export const ImageGallery: React.FC<ImageGalleryProps> = memo(({ album, className, ...props }) => {
    const [autoAnimateRef] = useAutoAnimate<HTMLDivElement>()
    const { data, loading } = useImageConnectionQuery({
        variables: {
            ...(album?.id ? { albumId: album.id } : {}),
        },
    })

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        )
    }

    if (data?.imageConnection?.nodes?.length === 0) {
        return <Muted className="flex h-full w-full items-center justify-center">No images found</Muted>
    }

    return (
        <div
            ref={autoAnimateRef}
            className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4', className)}
            {...props}
        >
            {data?.imageConnection?.nodes?.map(image => <ImageCard key={image.id} image={image} album={album} />)}
        </div>
    )
})
ImageGallery.displayName = 'ImageGallery'
