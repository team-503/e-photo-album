import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
@ObjectType({ isAbstract: true })
export class AlbumInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    name: string
}

@ObjectType()
export class AlbumType extends AlbumInput {
    @Field(() => Int)
    id: number
}
