import { IdArgs } from '@/common/id.args'
import { AlbumEntity } from '@/db/entities/album.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { AlbumConnectionType } from '@/endpoints/album/dto/album-connection.type'
import { AlbumInput, AlbumType } from '@/endpoints/album/dto/album.type'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Maybe } from 'graphql/jsutils/Maybe'
import { Repository } from 'typeorm'

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumEntity: Repository<AlbumEntity>,
    ) {}

    async albumConnection(currentUser: UserEntity): Promise<AlbumConnectionType> {
        const nodes = await this.albumEntity.find({
            where: {
                user: {
                    id: currentUser.id,
                },
            },
        })
        return {
            nodes,
            pageInfo: {
                limit: 10, // FIXME
                hasPrevPage: false, // FIXME
                hasNextPage: false, // FIXME
            },
        }
    }

    async getAlbumById(idArgs: IdArgs, currentUser: UserEntity): Promise<Maybe<AlbumType>> {
        return this.albumEntity.findOne({
            where: {
                id: idArgs.id,
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
