import { AlbumEntity } from '@/db/entities/album.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { OmitMethods } from '@/utils/type-helpers'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    blob: Buffer

    @Column()
    blobPreview: Buffer

    @Column()
    fileName: string

    @Column({ nullable: true })
    location?: string

    @CreateDateColumn()
    createdAt: Date = new Date()

    @ManyToOne(() => UserEntity, user => user.images, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user: UserEntity

    @ManyToOne(() => AlbumEntity, album => album.images, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    album?: AlbumEntity | null
}

export type ImageEntityCreate = Omit<OmitMethods<ImageEntity>, 'id' | 'createdAt'>
