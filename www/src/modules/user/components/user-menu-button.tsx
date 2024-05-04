import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useUserStore } from '@/modules/user/stores/user.store'
import { User } from 'lucide-react'
import { memo, useCallback } from 'react'
import useSignOut from 'react-auth-kit/hooks/useSignOut'

type UserMenuButtonProps = React.ComponentProps<typeof Button> & {
    align?: React.ComponentProps<typeof DropdownMenuContent>['align']
}
export const UserMenuButton: React.FC<UserMenuButtonProps> = memo(({ align, children, ...props }) => {
    const setUser = useUserStore(state => state.setUser)
    const signOut = useSignOut()

    const onLogOut = useCallback(() => {
        setUser(null)
        signOut()
    }, [setUser, signOut])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" {...props}>
                    <User />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} className="space-y-1">
                <DropdownMenuItem onSelect={onLogOut} className="flex cursor-pointer gap-2">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
})
UserMenuButton.displayName = 'UserMenuButton'
