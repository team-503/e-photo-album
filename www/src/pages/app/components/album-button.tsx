import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { memo } from 'react'

type AlbumButtonProps = React.ComponentProps<typeof Button>
export const AlbumButton: React.FC<AlbumButtonProps> = memo(({ className, ...props }) => {
    return <Button variant="ghost" className={cn('flex justify-start gap-2', className)} {...props} />
})
AlbumButton.displayName = 'AlbumButton'
