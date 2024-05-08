import { AlbumConnectionDocument, AlbumType, useRemoveAlbumMutation } from '@/__generated__/graphql'
import { Button } from '@/components/ui/button'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { cn } from '@/utils/cn'
import { memo, useCallback } from 'react'
import { toast } from 'sonner'

type AlbumButtonProps = React.ComponentProps<typeof Button> & {
    album: AlbumType
}
export const AlbumButton: React.FC<AlbumButtonProps> = memo(({ album, className, children, ...props }) => {
    const [removeAlbumMutation] = useRemoveAlbumMutation({
        variables: {
            removeAlbumId: album.id,
        },
    })

    const onDeleteALbum = useCallback(async () => {
        const res = await removeAlbumMutation({
            variables: {
                removeAlbumId: album.id,
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
        if (!res.data?.removeAlbum?.isSuccess) {
            toast.error(`Failed to remove album "${album.name}"!`)
            return
        }
        toast.success(`Album "${album.name}" removed`)
    }, [album.id, album.name, removeAlbumMutation])

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Button variant="ghost" className={cn('flex justify-start gap-2', className)} {...props}>
                    {children}
                </Button>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onSelect={onDeleteALbum}>Remove album</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
})
AlbumButton.displayName = 'AlbumButton'
