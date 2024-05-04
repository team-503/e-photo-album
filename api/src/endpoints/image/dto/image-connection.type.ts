import { PageInfoType } from '@/common/page-info.type'
import { ImageType } from '@/endpoints/image/dto/image.type'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ImageConnectionType {
    @Field(() => [ImageType])
    nodes: ImageType[]

    @Field(() => PageInfoType)
    pageInfo: PageInfoType
}
