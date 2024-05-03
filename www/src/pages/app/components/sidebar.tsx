import { useAlbumConnectionQuery } from '@/__generated__/graphql'
import { Show } from '@/components/show-when'
import { Muted } from '@/components/typography/muted'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { iconConfig } from '@/config/icon.config'
import { UrlConfig } from '@/config/url.config'
import { AddImageButton } from '@/pages/app/components/add-image-button'
import { AlbumButton } from '@/pages/app/components/album-button'
import { BookImage, FileImage, Loader2, Plus } from 'lucide-react'
import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

type SidebarProps = unknown
export const Sidebar: React.FC<SidebarProps> = memo(() => {
    const { data, loading } = useAlbumConnectionQuery()
    const location = useLocation()

    return (
        <div className="h-full w-[400px] p-4">
            <Card className="h-full w-full py-5">
                <CardContent className="flex flex-col gap-2">
                    <AddImageButton />
                    <AlbumButton asChild variant={location.pathname === UrlConfig.app.url ? 'secondary' : null}>
                        <Link to={UrlConfig.app.url}>
                            <FileImage size={iconConfig.buttonSize} />
                            All photos
                        </Link>
                    </AlbumButton>
                    <Separator className='my-2' />
                    <Muted>Albums</Muted>
                    <Show>
                        <Show.When isTrue={data?.albumConnection != null}>
                            {data?.albumConnection?.map(album => (
                                <AlbumButton key={album.id}>
                                    <BookImage size={iconConfig.buttonSize} />
                                    {album.name}
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
                        <Plus size={iconConfig.buttonSize} />
                        Create new album
                    </AlbumButton>
                </CardContent>
            </Card>
        </div>
    )
})
Sidebar.displayName = 'Sidebar'
