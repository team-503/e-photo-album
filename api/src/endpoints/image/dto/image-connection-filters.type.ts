import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ImageConnectionFiltersType {
    @Field(() => Int, { nullable: true })
    albumId?: number
}
