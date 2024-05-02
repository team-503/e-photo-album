import { ImageEntity } from '@/db/entities/image.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { ImageConnectionFiltersType } from '@/endpoints/image/dto/image-connection-filters.type'
import { ImageInput, ImageType } from '@/endpoints/image/dto/image.type'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import config from 'config'
import ms from 'ms'
import sharp from 'sharp'
import { Repository } from 'typeorm'

@Injectable()
export class ImageService {
    private readonly compressionSize = config.get<number>('image.compression.size')
    private readonly compressionQuality = config.get<number>('image.compression.quality')
    private readonly cacheTtl = ms(config.get<string>('image.cache.ttl'))

    private getImagePreviewCacheKey(id: number): string {
        return `image-preview-${id}`
    }

    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageEntity: Repository<ImageEntity>,
        @Inject(CACHE_MANAGER) private cache: Cache,
    ) {}

    async imageConnection(filters: ImageConnectionFiltersType, currentUser: UserEntity): Promise<ImageType[]> {
        return this.imageEntity.find({
            where: {
                user: {
                    id: currentUser.id,
                },
                ...(filters.albumId && {
                    album: {
                        id: filters.albumId,
                    },
                }),
            },
        })
    }

    async getStaticImage(id: number): Promise<Buffer> {
        const image = await this.imageEntity.findOne({
            select: ['blob'],
            where: {
                id,
            },
        })
        if (!image?.blob) {
            throw new NotFoundException('Image not found')
        }
        return image.blob
    }

    async getStaticImagePreview(id: number): Promise<Buffer> {
        const cachedImage = await this.cache.get<Buffer>(this.getImagePreviewCacheKey(id))
        if (cachedImage) {
            return cachedImage
        }
        const image = await this.imageEntity.findOne({
            select: ['blobPreview'],
            where: {
                id,
            },
        })
        if (!image?.blobPreview) {
            throw new NotFoundException('Image not found')
        }
        this.cache.set(this.getImagePreviewCacheKey(id), image.blobPreview, this.cacheTtl)
        return image.blobPreview
    }

    async uploadImage(image: ImageInput, currentUser: UserEntity): Promise<ImageEntity> {
        const inputBuffer = Buffer.from(image.blob, 'base64')
        const [blob, blobPreview] = await Promise.all([
            sharp(inputBuffer).png().toBuffer(),
            sharp(inputBuffer).resize(this.compressionSize).png({ quality: this.compressionQuality }).toBuffer(),
        ])
        return this.imageEntity.save({
            blob,
            blobPreview,
            location: image.location,
            user: currentUser,
        })
    }
}
