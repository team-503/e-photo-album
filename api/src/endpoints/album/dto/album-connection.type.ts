import { PageInfoType } from '@/common/page-info.type'
import { AlbumType } from '@/endpoints/album/dto/album.type'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AlbumConnectionType {
    @Field(() => [AlbumType])
    nodes: AlbumType[]

    @Field(() => PageInfoType)
    pageInfo: PageInfoType
}
