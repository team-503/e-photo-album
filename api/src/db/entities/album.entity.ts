import { ImageEntity } from '@/db/entities/image.entity'
import { UserEntity } from '@/db/entities/user.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => UserEntity, user => user.albums)
    user: UserEntity

    @OneToMany(() => ImageEntity, image => image.album)
    images: ImageEntity[]
}
