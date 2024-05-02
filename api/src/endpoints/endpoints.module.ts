import { AlbumModule } from '@/endpoints/album/album.module'
import { ImageModule } from '@/endpoints/image/image.module'
import { UserModule } from '@/endpoints/user/user.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [UserModule, ImageModule, AlbumModule],
})
export class GraphQLEndpointsModule {}
