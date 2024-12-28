import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  HttpCode,
  NotFoundException,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { IsValidUuid } from 'src/decorators/isValidUuid.decorators';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate as uuidValidate } from 'uuid';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(201)
  @Auth()
  @Header('Accept', 'application/json')
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.artistId && !uuidValidate(createAlbumDto.artistId)) {
      throw new BadRequestException('Not uuid');
    }

    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(200)
  @Auth()
  @Header('Accept', 'application/json')
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Auth()
  @Header('Accept', 'application/json')
  async getById(
    @Param('id')
    @IsValidUuid()
    id: string,
  ) {
    const result = await this.albumService.getById(id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }

    return result;
  }

  @Put(':id')
  @HttpCode(200)
  @Auth()
  @Header('Accept', 'application/json')
  update(
    @Param('id') @IsValidUuid() id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (updateAlbumDto.artistId && !uuidValidate(updateAlbumDto.artistId)) {
      throw new BadRequestException('Not uuid');
    }

    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Auth()
  remove(@Param('id') @IsValidUuid() id: string) {
    return this.albumService.remove(id);
  }
}
