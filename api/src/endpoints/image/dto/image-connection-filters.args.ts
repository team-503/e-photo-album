import { DEFAULT_LIMIT } from '@/common/constants'
import { CursorConnectionArgs } from '@/common/cursor-connection.args'
import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator'

@ArgsType()
export class ImageConnectionFiltersArgs extends CursorConnectionArgs {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(0)
    albumId?: number | null

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    location?: string | null
}
