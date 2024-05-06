import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql'
import { IsBase64, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
@ObjectType({ isAbstract: true })
export class ImageInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    @IsBase64()
    blob!: string

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    fileName: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    location?: string
}

@ObjectType()
export class ImageType extends OmitType(ImageInput, ['blob'] as const, ObjectType) {
    @Field(() => Int)
    id: number

    @Field(() => String)
    createdAt: Date
}
