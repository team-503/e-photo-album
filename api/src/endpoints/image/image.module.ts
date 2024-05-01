import { ImageEntity } from '@/db/entities/image.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { ImageController } from '@/endpoints/image/image.controller'
import { ImageResolver } from '@/endpoints/image/image.resolver'
import { ImageService } from '@/endpoints/image/image.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ImageEntity])],
    providers: [ImageResolver, ImageService],
    controllers: [ImageController],
})
export class ImageModule {}
