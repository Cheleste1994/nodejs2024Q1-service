import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Header,
  NotFoundException,
  Put,
} from '@nestjs/common';

import { IsValidUuid } from 'src/decorators/isValidUuid.decorators';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistService } from './artist.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(201)
  @Header('Accept', 'application/json')
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(200)
  @Header('Accept', 'application/json')
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Header('Accept', 'application/json')
  async getById(
    @Param('id')
    @IsValidUuid()
    id: string,
  ) {
    const result = await this.artistService.getById(id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }

    return result;
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Accept', 'application/json')
  update(
    @Param('id') @IsValidUuid() id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') @IsValidUuid() id: string) {
    return this.artistService.remove(id);
  }
}
