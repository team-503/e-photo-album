import { AlbumEntity } from '@/db/entities/album.entity'
import { AlbumResolver } from '@/endpoints/album/album.resolver'
import { AlbumService } from '@/endpoints/album/album.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([AlbumEntity])],
    providers: [AlbumResolver, AlbumService],
})
export class AlbumModule {}
