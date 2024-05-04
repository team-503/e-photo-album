import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { IsSuccessType } from '@/common/is-success.type'
import { UserEntity } from '@/db/entities/user.entity'
import { AddImageToAlbumArgs } from '@/endpoints/image/dto/add-image-to-album.args'
import { DeleteImageArgs } from '@/endpoints/image/dto/delete-image.args'
import { ImageConnectionFiltersArgs } from '@/endpoints/image/dto/image-connection-filters.args'
import { ImageConnectionType } from '@/endpoints/image/dto/image-connection.type'
import { ImageInput, ImageType } from '@/endpoints/image/dto/image.type'
import { RemoveImageFromAlbumArgs } from '@/endpoints/image/dto/remove-image-from-album.args'
import { ImageService } from '@/endpoints/image/image.service'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { readFileSync } from 'fs'
import path from 'path'

@Resolver(() => ImageType)
@UseGuards(GqlAuthGuard)
export class ImageResolver {
    constructor(private readonly imageService: ImageService) {}

    @Query(() => ImageConnectionType)
    async imageConnection(
        @Args({ type: () => ImageConnectionFiltersArgs, nullable: true })
        filters: ImageConnectionFiltersArgs,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<ImageConnectionType> {
        return this.imageService.imageConnection(filters, currentUser)
    }

    @Mutation(() => ImageType)
    async uploadImage(
        @Args({ name: 'image', type: () => ImageInput }) image: ImageInput,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<ImageType> {
        return this.imageService.uploadImage(image, currentUser)
    }

    @Mutation(() => IsSuccessType)
    async addImageToAlbum(
        @Args({ type: () => AddImageToAlbumArgs }) data: AddImageToAlbumArgs,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<IsSuccessType> {
        return this.imageService.addImageToAlbum(data, currentUser)
    }

    @Mutation(() => IsSuccessType)
    async removeImageFromAlbum(
        @Args({ type: () => RemoveImageFromAlbumArgs }) data: RemoveImageFromAlbumArgs,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<IsSuccessType> {
        return this.imageService.removeImageFromAlbum(data, currentUser)
    }

    @Mutation(() => IsSuccessType)
    async deleteImage(
        @Args({ type: () => DeleteImageArgs }) data: DeleteImageArgs,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<IsSuccessType> {
        return this.imageService.deleteImage(data, currentUser)
    }

    //
    //
    //

    // FIXME: TEST ONLY
    @Query(() => IsSuccessType)
    async triggerImageUploadFromBackend(@Args({ name: 'auth', type: () => String }) auth: string): Promise<IsSuccessType> {
        const file = readFileSync(path.resolve(process.cwd(), 'local', 'img.png'))
        const blob = file.toString('base64')
        const graphqlQuery = {
            query: `
            mutation UploadImage($image: ImageInput!) {
                uploadImage(image: $image) {
                  fileName
                  location
                  id
                }
              }
            `,
            variables: {
                image: {
                    blob,
                    fileName: 'image1',
                    location: 'Lviv',
                },
            },
        }
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                auth,
            },
            body: JSON.stringify(graphqlQuery),
        }
        const graphQLUrl = 'http://localhost:4000/graphql'
        try {
            const response = await fetch(graphQLUrl, requestOptions)
            const data = await response.json()
            console.log('🚀 ~ ImageResolver ~ triggerImageUploadFromBackend ~ data:', data)
        } catch (error) {
            console.log(error)
        }
        return {
            isSuccess: true,
        }
    }
}
