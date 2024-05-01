import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql'
import { IsBase64, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class ImageInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    @IsBase64()
    blob: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    location?: string
}

@ObjectType()
export class ImageType {
    @Field(() => Int)
    id: number

    @Field(() => String, { nullable: true })
    location?: string
}
