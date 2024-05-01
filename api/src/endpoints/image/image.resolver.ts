import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { IsSuccessType } from '@/common/is-success.type'
import { UserEntity } from '@/db/entities/user.entity'
import { ImageInput, ImageType } from '@/endpoints/image/dto/image.type'
import { ImageService } from '@/endpoints/image/image.service'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { readFileSync } from 'fs'

@UseGuards(GqlAuthGuard)
@Resolver(() => ImageType)
export class ImageResolver {
    constructor(private readonly imageService: ImageService) {}

    @Query(() => [ImageType])
    async imageConnection(@CurrentUser() currentUser: UserEntity): Promise<ImageType[]> {
        return this.imageService.imageConnection(currentUser)
    }

    @Mutation(() => ImageType)
    async uploadImage(
        @Args({ name: 'image', type: () => ImageInput }) image: ImageInput,
        @CurrentUser() currentUser: UserEntity,
    ): Promise<ImageType> {
        return this.imageService.uploadImage(image, currentUser)
    }

    //
    //
    //

    // FIXME: TEST ONLY
    @Query(() => IsSuccessType)
    async triggerImageUploadFromBackend(): Promise<IsSuccessType> {
        const file = readFileSync('/Users/oleh/Desktop/e-photo-album/local/img.png')
        const blob = file.toString('base64')
        const graphqlQuery = {
            query: `
              mutation UploadImage($image: ImageInput!) {
                uploadImage(image: $image) {
                  location
                  id
                }
              }
            `,
            variables: {
                image: {
                    blob,
                },
            },
        }
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcxNDU5ODE5MSwiZXhwIjoxNzE2NDEyNTkxfQ.MJSlIs4FQMGjk2hnEqgb5O0ntlBWr8VAyIIq1qhJJxI',
            },
            body: JSON.stringify(graphqlQuery),
        }
        const graphQLUrl = 'http://localhost:4000/graphql'
        const response = await fetch(graphQLUrl, requestOptions)
        const data = await response.json()
        console.log('🚀 ~ ImageResolver ~ test ~ data:', JSON.stringify(data, null, 2))
        return {
            isSuccess: true,
        }
    }
}
