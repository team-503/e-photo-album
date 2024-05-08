import { CursorConnectionArgs } from '@/common/cursor-connection.args'
import { IdArgs } from '@/common/id.args'
import { IsSuccessType } from '@/common/is-success.type'
import { AlbumEntity } from '@/db/entities/album.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { AlbumConnectionType } from '@/endpoints/album/dto/album-connection.type'
import { AlbumInput, AlbumType } from '@/endpoints/album/dto/album.type'
import { connectionAgg } from '@/utils/connection-agg'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Maybe } from 'graphql/jsutils/Maybe'
import { MoreThan, Repository } from 'typeorm'

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumEntity: Repository<AlbumEntity>,
    ) {}

    async albumConnection(args: CursorConnectionArgs, currentUser: UserEntity): Promise<AlbumConnectionType> {
        const nodes = await this.albumEntity.find({
            where: {
                user: {
                    id: currentUser.id,
                },
                ...(args.nextPageCursor && {
                    id: MoreThan(args.nextPageCursor || 0),
                }),
            },
            take: args.limit,
        })
        return connectionAgg(nodes, args)
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

    async removeAlbum(idArgs: IdArgs, currentUser: UserEntity): Promise<IsSuccessType> {
        const result = await this.albumEntity.delete({
            id: idArgs.id,
        })
        return {
            isSuccess: result.affected === 1,
        }
    }
}
