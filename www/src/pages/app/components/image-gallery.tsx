import { AlbumType, useImageConnectionLazyQuery } from '@/__generated__/graphql'
import { Show } from '@/components/show-when'
import { Muted } from '@/components/typography/muted'
import { Input } from '@/components/ui/input'
import { ImageCard } from '@/pages/app/components/image-card'
import { cn } from '@/utils/cn'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useDebounce } from '@uidotdev/usehooks'
import { Loader2 } from 'lucide-react'
import { memo, useEffect, useState } from 'react'

type ImageGalleryProps = React.ComponentProps<'div'> & {
    album?: AlbumType
}
export const ImageGallery: React.FC<ImageGalleryProps> = memo(({ album, className, ...props }) => {
    const [imageConnectionQuery, { data, loading }] = useImageConnectionLazyQuery({
        variables: {
            limit: 1000,
        },
    })
    const [autoAnimateRef] = useAutoAnimate<HTMLDivElement>()
    const [location, setLocation] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')
    const locationDebounced = useDebounce(location, 500)
    const fileNameDebounced = useDebounce(fileName, 500)

    useEffect(() => {
        imageConnectionQuery({
            variables: {
                limit: 1000,
                ...(album?.id ? { albumId: album.id } : {}),
                ...(fileNameDebounced ? { fileName: fileNameDebounced } : {}),
                ...(locationDebounced ? { location: locationDebounced } : {}),
            },
        })
    }, [album?.id, fileNameDebounced, imageConnectionQuery, locationDebounced])

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full lg:flex-1 xl:w-96 xl:flex-auto"
                />
                <Input
                    type="text"
                    placeholder="File name"
                    value={fileName}
                    onChange={e => setFileName(e.target.value)}
                    className="w-full lg:flex-1 xl:w-96 xl:flex-auto"
                />
            </div>
            <Show>
                <Show.When isTrue={data?.imageConnection?.nodes?.length === 0}>
                    <Muted className="flex h-[90%] items-center justify-center">No images found</Muted>
                </Show.When>
                <Show.Else>
                    <div
                        ref={autoAnimateRef}
                        className={cn(
                            'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7',
                            className,
                        )}
                        {...props}
                    >
                        {data?.imageConnection?.nodes?.map(image => <ImageCard key={image.id} image={image} album={album} />)}
                    </div>
                </Show.Else>
            </Show>
        </>
    )
})
ImageGallery.displayName = 'ImageGallery'
