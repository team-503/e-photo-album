import { ImageEntity } from '@/db/entities/image.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { ImageInput, ImageType } from '@/endpoints/image/dto/image.type'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import sharp from 'sharp'
import { Repository } from 'typeorm'

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageEntity: Repository<ImageEntity>,
    ) {}

    async imageConnection(currentUser: UserEntity): Promise<ImageType[]> {
        return this.imageEntity.find({
            where: {
                user: {
                    id: currentUser.id,
                },
            },
        })
    }

    async getStaticImage(id: number): Promise<Buffer> {
        const image = await this.imageEntity.findOne({
            where: {
                id,
            },
        })
        if (!image) {
            throw new NotFoundException('Image not found')
        }
        return image.blob
    }

    async uploadImage(image: ImageInput, currentUser: UserEntity): Promise<ImageEntity> {
        const inputBuffer = Buffer.from(image.blob, 'base64')
        const newBlob = await sharp(inputBuffer).png().toBuffer()
        return this.imageEntity.save({
            blob: newBlob,
            location: image.location,
            user: currentUser,
        })
    }
}
