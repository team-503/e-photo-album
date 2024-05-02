import { ImageEntity } from '@/db/entities/image.entity'
import { ImageController } from '@/endpoints/image/image.controller'
import { ImageResolver } from '@/endpoints/image/image.resolver'
import { ImageService } from '@/endpoints/image/image.service'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forFeature([ImageEntity]),
        CacheModule.register({
            max: 100,
        }),
    ],
    providers: [ImageResolver, ImageService],
    controllers: [ImageController],
})
export class ImageModule {}
