import { AlbumEntity } from '@/db/entities/album.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { AlbumInput } from '@/endpoints/album/dto/album.type'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumEntity: Repository<AlbumEntity>,
    ) {}

    async albumConnection(currentUser: UserEntity): Promise<AlbumEntity[]> {
        return await this.albumEntity.find({
            where: {
                user: {
                    id: currentUser.id,
                },
            },
        })
    }

    async createAlbum(album: AlbumInput, currentUser: UserEntity): Promise<AlbumEntity> {
        return this.albumEntity.save({
            ...album,
            user: currentUser,
        })
    }
}
