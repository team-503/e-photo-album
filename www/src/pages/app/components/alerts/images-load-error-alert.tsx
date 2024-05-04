import { AlbumType, useImageConnectionQuery } from '@/__generated__/graphql'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleX } from 'lucide-react'
import { memo } from 'react'

type ImagesLoadErrorALertProps = {
    albumId?: AlbumType['id']
}
export const ImagesLoadErrorALert: React.FC<ImagesLoadErrorALertProps> = memo(({ albumId }) => {
    const { error } = useImageConnectionQuery({
        variables: {
            ...(albumId ? { albumId } : {}),
        },
    })

    if (!error) {
        return null
    }

    return (
        <Alert>
            <CircleX className="h-4 w-4" />
            <AlertTitle>Failed to load photos!</AlertTitle>
            <AlertDescription>We are already working on solving this problem</AlertDescription>
        </Alert>
    )
})
ImagesLoadErrorALert.displayName = 'ImagesLoadErrorALert'
