import { AlbumEntity } from '@/db/entities/album.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    blob: Buffer

    @Column()
    blobPreview: Buffer

    @Column({ nullable: true })
    location?: string

    @ManyToOne(() => UserEntity, user => user.images)
    user: UserEntity

    @ManyToOne(() => AlbumEntity, album => album.images, { nullable: true })
    album?: AlbumEntity
}
