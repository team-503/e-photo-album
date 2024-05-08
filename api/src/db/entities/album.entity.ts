import { ImageEntity } from '@/db/entities/image.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => UserEntity, user => user.albums, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user: UserEntity

    @OneToMany(() => ImageEntity, image => image.album, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    images: ImageEntity[]
}
