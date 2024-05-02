import { ImageService } from '@/endpoints/image/image.service'
import { Controller, Get, Header, Param, StreamableFile } from '@nestjs/common'
import { Readable } from 'stream'

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get(':id')
    @Header('Content-Type', 'image/png')
    async getStaticImage(@Param('id') id: number): Promise<StreamableFile> {
        const buffer = await this.imageService.getStaticImage(id)
        const fileStream = Readable.from(buffer)
        return new StreamableFile(fileStream)
    }
}