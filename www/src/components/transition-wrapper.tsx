import { ChildrenProps } from '@/types/children.type'
import { motion } from 'framer-motion'
import { memo } from 'react'

type TransitionWrapperProps = ChildrenProps
export const TransitionWrapper: React.FC<TransitionWrapperProps> = memo(({ children }) => {
    return (
        <>
            {children}
            {/* slide-in */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="fixed left-0 top-0 z-[1000] h-screen w-full origin-bottom bg-violet-500"
            />
            {/* slide-out */}
            <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="fixed left-0 top-0 z-[1000] h-screen w-full origin-top bg-violet-500"
            />
        </>
    )
})
TransitionWrapper.displayName = 'TransitionWrapper'
