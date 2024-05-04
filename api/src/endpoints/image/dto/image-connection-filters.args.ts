import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class ImageConnectionFiltersArgs {
    @Field(() => Int, { nullable: true, defaultValue: 10 })
    limit: number

    @Field(() => Int, { nullable: true })
    albumId?: number
}
