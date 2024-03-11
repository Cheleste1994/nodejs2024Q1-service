import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Header,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiTags } from '@nestjs/swagger';
import { IsValidUuid } from 'src/decorators/isValidUuid.decorators';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}
  @Get()
  @HttpCode(200)
  @Header('Accept', 'application/json')
  getAll() {
    return this.favsService.getAll();
  }

  @Post('/track/:id')
  @HttpCode(201)
  @Header('Accept', 'application/json')
  async addTrack(@Param('id') @IsValidUuid() id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') @IsValidUuid() id: string) {
    return this.favsService.removeTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(201)
  @Header('Accept', 'application/json')
  async addAlbum(@Param('id') @IsValidUuid() id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') @IsValidUuid() id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(201)
  @Header('Accept', 'application/json')
  async addArtist(@Param('id') @IsValidUuid() id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') @IsValidUuid() id: string) {
    return this.favsService.removeArtist(id);
  }
}
