import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Header,
  BadRequestException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate as uuidValidate } from 'uuid';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(201)
  @Header('Accept', 'application/json')
  async create(@Body() createTrackDto: CreateTrackDto) {
    if (createTrackDto.albumId && !uuidValidate(createTrackDto.albumId)) {
      throw new BadRequestException('Not uuid');
    }

    if (createTrackDto.artistId && !uuidValidate(createTrackDto.artistId)) {
      throw new BadRequestException('Not uuid');
    }

    return this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(200)
  @Header('Accept', 'application/json')
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  @Header('Accept', 'application/json')
  async getById(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Not uuid');
    }

    const result = await this.trackService.getById(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return this.trackService.getById(id);
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Accept', 'application/json')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Not uuid');
    }

    if (updateTrackDto.albumId && !uuidValidate(updateTrackDto.albumId)) {
      throw new BadRequestException('Not uuid');
    }

    if (updateTrackDto.artistId && !uuidValidate(updateTrackDto.artistId)) {
      throw new BadRequestException('Not uuid');
    }

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Not uuid');
    }

    return this.trackService.remove(id);
  }
}
