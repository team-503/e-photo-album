import { useGetAlbumByIdQuery } from '@/__generated__/graphql'
import { PageWrapper } from '@/components/page-wrapper'
import { UrlConfig } from '@/config/url.config'
import { AlbumsLoadErrorALert } from '@/pages/app/components/alerts/albums-load-error-alert'
import { ImagesLoadErrorALert } from '@/pages/app/components/alerts/images-load-error-alert'
import { ImageGallery } from '@/pages/app/components/image-gallery'
import { ErrorPage } from '@/pages/error.page'
import { NotFoundPage } from '@/pages/not-found.page'
import { memo } from 'react'
import { useParams } from 'react-router-dom'

type AlbumIdPageProps = unknown
export const AlbumIdPage: React.FC<AlbumIdPageProps> = memo(() => {
    const { id } = useParams<{ id: string }>()
    const { data } = useGetAlbumByIdQuery({
        variables: {
            getAlbumByIdId: Number(id) || -1,
        },
    })

    if (!id) {
        return <ErrorPage />
    }
    if (!data?.getAlbumById) {
        return <NotFoundPage />
    }

    return (
        <PageWrapper
            breadcrumbs={[
                UrlConfig.main,
                UrlConfig.app,
                { ...UrlConfig.app, label: 'Albums' },
                { label: data?.getAlbumById?.name, url: UrlConfig.albumId.getDynamicUrl(data?.getAlbumById?.id) },
            ]}
            container={false}
            className="space-y-3"
        >
            <AlbumsLoadErrorALert />
            <ImagesLoadErrorALert />
            <ImageGallery album={data?.getAlbumById} className="overflow-y-hidden pb-5" />
        </PageWrapper>
    )
})
AlbumIdPage.displayName = 'AlbumIdPage'
