import { AlbumEntity } from '@/db/entities/album.entity'
import { ImageEntity } from '@/db/entities/image.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => ImageEntity, image => image.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    images: ImageEntity[]

    @OneToMany(() => AlbumEntity, album => album.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    albums: AlbumEntity[]
}
