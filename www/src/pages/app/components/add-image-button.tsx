import { Button } from '@/components/ui/button'
import { iconConfig } from '@/config/icon.config'
import { cn } from '@/utils/cn'
import { ImagePlus } from 'lucide-react'
import { memo } from 'react'

type AddImageButtonProps = React.ComponentProps<typeof Button>
export const AddImageButton: React.FC<AddImageButtonProps> = memo(({ className, ...props }) => {
    return (
        <Button variant="default" className={cn('flex justify-start gap-2', className)} {...props}>
            <ImagePlus size={iconConfig.buttonSize} />
            Add new photos
        </Button>
    )
})
AddImageButton.displayName = 'AddImageButton'
