import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { CursorConnectionArgs } from '@/common/cursor-connection.args'
import { IdArgs } from '@/common/id.args'
import { IsSuccessType } from '@/common/is-success.type'
import { UserEntity } from '@/db/entities/user.entity'
import { AlbumService } from '@/endpoints/album/album.service'
import { AlbumConnectionType } from '@/endpoints/album/dto/album-connection.type'
import { AlbumInput, AlbumType } from '@/endpoints/album/dto/album.type'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Maybe } from 'graphql/jsutils/Maybe'

@Resolver()
@UseGuards(GqlAuthGuard)
export class AlbumResolver {
    constructor(private readonly albumService: AlbumService) {}

    @Query(() => AlbumConnectionType)
    async albumConnection(
        @Args({ type: () => CursorConnectionArgs }) args: CursorConnectionArgs,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<AlbumConnectionType> {
        return this.albumService.albumConnection(args, currentUser)
    }

    @Query(() => AlbumType, { nullable: true })
    async getAlbumById(
        @Args({ type: () => IdArgs }) idArgs: IdArgs,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<Maybe<AlbumType>> {
        return this.albumService.getAlbumById(idArgs, currentUser)
    }

    @Mutation(() => AlbumType)
    async createAlbum(
        @Args({ name: 'album', type: () => AlbumInput }) album: AlbumInput,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<AlbumType> {
        return this.albumService.createAlbum(album, currentUser)
    }

    @Mutation(() => IsSuccessType)
    async removeAlbum(
        @Args({ type: () => IdArgs }) data: IdArgs,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<IsSuccessType> {
        return this.albumService.removeAlbum(data, currentUser)
    }
}
