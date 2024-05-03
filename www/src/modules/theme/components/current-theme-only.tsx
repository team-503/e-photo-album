import { useThemeStore } from '@/modules/theme/stores/theme.store'
import { ChildrenProps } from '@/types/children.type'
import { memo } from 'react'

type CurrentThemeOnlyProps = ChildrenProps & {
    theme: string
}
export const CurrentThemeOnly: React.FC<CurrentThemeOnlyProps> = memo(({ theme, children }) => {
    const currentTheme = useThemeStore(state => state.theme)

    return currentTheme === theme ? children : null
})
CurrentThemeOnly.displayName = 'CurrentThemeOnly'
