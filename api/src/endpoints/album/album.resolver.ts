import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { UserEntity } from '@/db/entities/user.entity'
import { AlbumService } from '@/endpoints/album/album.service'
import { AlbumInput, AlbumType } from '@/endpoints/album/dto/album.type'
import { ImageConnectionFiltersType } from '@/endpoints/image/dto/image-connection-filters.type'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(GqlAuthGuard)
export class AlbumResolver {
    constructor(private readonly albumService: AlbumService) {}

    @Query(() => [AlbumType])
    async albumConnection(@CurrentUser() currentUser: UserEntity): Promise<AlbumType[]> {
        return this.albumService.albumConnection(currentUser)
    }

    @Mutation(() => AlbumType)
    async createAlbum(
        @Args({ name: 'album', type: () => AlbumInput }) album: AlbumInput,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<AlbumType> {
        return this.albumService.createAlbum(album, currentUser)
    }
}
