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
import { IsValidUuid } from 'src/decorators/isValidUuid.decorators';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(201)
  @Auth()
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
  @Auth()
  @Header('Accept', 'application/json')
  getAll() {
    return this.trackService.getAll();
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
    const result = await this.trackService.getById(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }

    return result;
  }

  @Put(':id')
  @HttpCode(200)
  @Auth()
  @Header('Accept', 'application/json')
  update(
    @Param('id') @IsValidUuid() id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (updateTrackDto.albumId && !uuidValidate(updateTrackDto.albumId)) {
      throw new BadRequestException('Not uuid');
    }

    if (updateTrackDto.artistId && !uuidValidate(updateTrackDto.artistId)) {
      throw new BadRequestException('Not uuid');
    }

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @Auth()
  @HttpCode(204)
  remove(@Param('id') @IsValidUuid() id: string) {
    return this.trackService.remove(id);
  }
}
