import { DEFAULT_LIMIT } from '@/common/constants'
import { IsSuccessType } from '@/common/is-success.type'
import { ImageEntity, ImageEntityCreate } from '@/db/entities/image.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { AddImageToAlbumArgs } from '@/endpoints/image/dto/add-image-to-album.args'
import { DeleteImageArgs } from '@/endpoints/image/dto/delete-image.args'
import { ImageConnectionFiltersArgs } from '@/endpoints/image/dto/image-connection-filters.args'
import { ImageConnectionType } from '@/endpoints/image/dto/image-connection.type'
import { ImageInput, ImageType } from '@/endpoints/image/dto/image.type'
import { RemoveImageFromAlbumArgs } from '@/endpoints/image/dto/remove-image-from-album.args'
import { connectionAgg } from '@/utils/connection-agg'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Builder, StrictBuilder } from 'builder-pattern'
import config from 'config'
import ms from 'ms'
import sharp from 'sharp'
import { In, Like, MoreThan, Repository } from 'typeorm'

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

    async imageConnection(args: ImageConnectionFiltersArgs, currentUser: UserEntity): Promise<ImageConnectionType> {
        const nodes = await this.imageEntity.find({
            where: {
                user: {
                    id: currentUser.id,
                },
                ...(args.nextPageCursor && {
                    id: MoreThan(args.nextPageCursor || 0),
                }),
                ...(args.albumId && {
                    album: {
                        id: args.albumId,
                    },
                }),
                ...(args.location && {
                    location: Like(`%${args.location}%`),
                }),
            },
            take: args.limit,
        })
        return connectionAgg(nodes, args)
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

    async uploadImage(image: ImageInput, currentUser: UserEntity): Promise<ImageType> {
        const inputBuffer = Buffer.from(image.blob, 'base64')
        const [blob, blobPreview] = await Promise.all([
            sharp(inputBuffer).png().toBuffer(),
            sharp(inputBuffer).resize(this.compressionSize).png({ quality: this.compressionQuality }).toBuffer(),
        ])
        return this.imageEntity.save(
            StrictBuilder<ImageEntityCreate>()
                .blob(blob)
                .blobPreview(blobPreview)
                .fileName(image.fileName)
                .location(image.location)
                .user(currentUser)
                .build(),
        )
    }

    async addImageToAlbum(data: AddImageToAlbumArgs, currentUser: UserEntity): Promise<IsSuccessType> {
        await this.imageEntity.save({
            id: data.imageId,
            album: {
                id: data.albumId,
            },
        })
        return {
            isSuccess: true,
        }
    }

    async removeImageFromAlbum(data: RemoveImageFromAlbumArgs, currentUser: UserEntity): Promise<IsSuccessType> {
        await this.imageEntity.save({
            id: data.imageId,
            album: null,
        })
        return {
            isSuccess: true,
        }
    }

    async deleteImage(data: DeleteImageArgs, currentUser: UserEntity): Promise<IsSuccessType> {
        await this.imageEntity.delete({
            id: data.imageId,
        })
        return {
            isSuccess: true,
        }
    }
}
