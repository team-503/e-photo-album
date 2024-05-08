import { useAlbumConnectionQuery } from '@/__generated__/graphql'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleX } from 'lucide-react'
import { memo } from 'react'

type AlbumsLoadErrorALertProps = unknown
export const AlbumsLoadErrorALert: React.FC<AlbumsLoadErrorALertProps> = memo(() => {
    const { error } = useAlbumConnectionQuery({
        variables: {
            limit: 1,
        },
    })

    if (!error) {
        return null
    }

    return (
        <Alert>
            <CircleX className="h-4 w-4" />
            <AlertTitle>Failed to load albums!</AlertTitle>
            <AlertDescription>We are already working on solving this problem</AlertDescription>
        </Alert>
    )
})
AlbumsLoadErrorALert.displayName = 'AlbumsLoadErrorALert'
