import {
    AlbumType,
    ImageConnectionDocument,
    ImageType,
    useAddImageToAlbumMutation,
    useAlbumConnectionQuery,
    useDeleteImageMutation,
    useRemoveImageFromAlbumMutation,
} from '@/__generated__/graphql'
import { Show } from '@/components/show-when'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { UrlConfigApi } from '@/config/url.config'
import { cn } from '@/utils/cn'
import { Image, Loader2, Trash } from 'lucide-react'
import { memo, useCallback } from 'react'
import { toast } from 'sonner'

type ImageCardProps = React.ComponentProps<typeof Card> & {
    image: ImageType
    album?: AlbumType
}
export const ImageCard: React.FC<ImageCardProps> = memo(({ image, album, className, ...props }) => {
    const { data, loading } = useAlbumConnectionQuery()
    const [addImageToAlbumMutation] = useAddImageToAlbumMutation()
    const [removeImageFromAlbumMutation] = useRemoveImageFromAlbumMutation()
    const [deleteImageMutation] = useDeleteImageMutation()

    const onAddToAlbum = useCallback(
        (selectedAlbum: AlbumType) => async () => {
            const res = await addImageToAlbumMutation({
                variables: {
                    imageId: image.id,
                    albumId: selectedAlbum.id,
                },
                refetchQueries: [
                    {
                        query: ImageConnectionDocument,
                        variables: {
                            albumId: selectedAlbum.id,
                        },
                    },
                ],
            })
            if (!res.data?.addImageToAlbum?.isSuccess) {
                toast.error(`Failed to add image to album "${selectedAlbum.name}"`)
                return
            }
            toast.success(`Image added to album "${selectedAlbum.name}"!`)
        },
        [addImageToAlbumMutation, image.id],
    )

    const onRemoveFromAlbum = useCallback(async () => {
        if (album == null) {
            return
        }
        const res = await removeImageFromAlbumMutation({
            variables: {
                imageId: image.id,
                albumId: album.id,
            },
            refetchQueries: [
                {
                    query: ImageConnectionDocument,
                    variables: {
                        albumId: album.id,
                    },
                },
            ],
        })
        if (!res.data?.removeImageFromAlbum?.isSuccess) {
            toast.error(`Failed to remove image from album "${album.name}"`)
            return
        }
    }, [removeImageFromAlbumMutation, image.id, album])

    const onDelete = useCallback(async () => {
        const res = await deleteImageMutation({
            variables: {
                imageId: image.id,
            },
            refetchQueries: [
                { query: ImageConnectionDocument },
                {
                    query: ImageConnectionDocument,
                    variables: {
                        albumId: album?.id,
                    },
                },
            ],
        })
        if (!res.data?.deleteImage?.isSuccess) {
            toast.error('Failed to delete image')
            return
        }
        toast.success('Image deleted!')
    }, [album?.id, deleteImageMutation, image.id])

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Card className={cn('overflow-hidden', className)} {...props}>
                    <CardHeader className="px-3 py-3">
                        <CardDescription className="flex w-full items-center justify-start gap-2 text-foreground">
                            <Image className="h-4 w-4" />
                            <span className="overflow-hidden text-ellipsis">{image.fileName}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-2 pb-2">
                        <img src={UrlConfigApi.imagePreview.getDynamicUrl(image.id)} alt="Image" className="w-full rounded-md" />
                    </CardContent>
                </Card>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-[200px]">
                <ContextMenuSub>
                    <ContextMenuSubTrigger inset>Add to album...</ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <Show>
                            <Show.When isTrue={loading}>
                                <ContextMenuItem disabled className="flex items-center justify-center">
                                    <Loader2 className="h-4 w-4" />
                                </ContextMenuItem>
                            </Show.When>
                            <Show.When
                                isTrue={
                                    data?.albumConnection?.nodes == null ||
                                    data?.albumConnection?.nodes?.length === 0 ||
                                    (data?.albumConnection?.nodes?.length === 1 &&
                                        data?.albumConnection?.nodes[0].id === album?.id)
                                }
                            >
                                <ContextMenuItem disabled>No albums available</ContextMenuItem>
                            </Show.When>
                            <Show.Else>
                                {data?.albumConnection?.nodes
                                    ?.filter(value => {
                                        if (album == null) {
                                            return true
                                        }
                                        return value.id !== album.id
                                    })
                                    ?.map(albumItem => (
                                        <ContextMenuItem key={albumItem.id} onSelect={onAddToAlbum(albumItem)}>
                                            {albumItem.name}
                                        </ContextMenuItem>
                                    ))}
                            </Show.Else>
                        </Show>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <Show>
                    <Show.When isTrue={album != null}>
                        <ContextMenuItem inset onSelect={onRemoveFromAlbum}>
                            Remove from album
                        </ContextMenuItem>
                    </Show.When>
                </Show>
                <ContextMenuSeparator />
                <ContextMenuItem onSelect={onDelete}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
})
ImageCard.displayName = 'ImageCard'
