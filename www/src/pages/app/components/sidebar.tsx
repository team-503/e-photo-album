import { useAlbumConnectionQuery } from '@/__generated__/graphql'
import { Show } from '@/components/show-when'
import { Muted } from '@/components/typography/muted'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UrlConfig } from '@/config/url.config'
import { AddImageButton } from '@/pages/app/components/buttons/add-image-button'
import { AlbumButton } from '@/pages/app/components/buttons/album-button'
import { cn } from '@/utils/cn'
import { BookImage, FileImage, Loader2, Plus } from 'lucide-react'
import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

type SidebarProps = React.ComponentProps<'div'>
export const Sidebar: React.FC<SidebarProps> = memo(({ className, ...props }) => {
    const { data, loading } = useAlbumConnectionQuery()
    const location = useLocation()

    return (
        <div className={cn('py-4', className)} {...props}>
            <Card className="h-full w-full py-5">
                <CardContent className="flex flex-col gap-2 pb-0">
                    <AddImageButton />
                    <AlbumButton asChild variant={location.pathname === UrlConfig.app.url ? 'secondary' : null}>
                        <Link to={UrlConfig.app.url}>
                            <FileImage className="h-4 w-4" />
                            All photos
                        </Link>
                    </AlbumButton>

                    <Separator className="my-2" />

                    <Muted>Albums</Muted>
                    <Show>
                        <Show.When isTrue={data?.albumConnection != null}>
                            {data?.albumConnection?.nodes?.map(album => (
                                <AlbumButton
                                    key={album.id}
                                    asChild
                                    variant={location.pathname === UrlConfig.albumId.getDynamicUrl(album.id) ? 'secondary' : null}
                                >
                                    <Link to={UrlConfig.albumId.getDynamicUrl(album.id)}>
                                        <BookImage className="h-4 w-4" />
                                        {album.name}
                                    </Link>
                                </AlbumButton>
                            ))}
                        </Show.When>
                        <Show.When isTrue={loading}>
                            <div className="flex w-full items-center justify-center">
                                <Loader2 />
                            </div>
                        </Show.When>
                    </Show>
                    <AlbumButton>
                        <Plus className="h-4 w-4" />
                        Create new album
                    </AlbumButton>
                </CardContent>
            </Card>
        </div>
    )
})
Sidebar.displayName = 'Sidebar'
