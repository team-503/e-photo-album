import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsInt, Min } from 'class-validator'

@ArgsType()
export class AddImageToAlbumArgs {
    @Field(() => Int)
    @IsInt()
    @Min(0)
    imageId: number

    @Field(() => Int)
    @IsInt()
    @Min(0)
    albumId: number
}
