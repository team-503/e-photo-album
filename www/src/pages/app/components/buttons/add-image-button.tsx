import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { ImagePlus } from 'lucide-react'
import { memo } from 'react'

type AddImageButtonProps = React.ComponentProps<typeof Button>
export const AddImageButton: React.FC<AddImageButtonProps> = memo(({ className, ...props }) => {
    return (
        <Button variant="default" className={cn('flex justify-start gap-2', className)} {...props}>
            <ImagePlus className="h-4 w-4" />
            Add new photos
        </Button>
    )
})
AddImageButton.displayName = 'AddImageButton'
