import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create({
    albumId,
    artistId,
    duration,
    name,
  }: CreateTrackDto): Promise<Track> {
    return this.prisma.track.create({
      data: {
        name,
        duration,
        albumId: albumId || null,
        artistId: artistId || null,
      },
    });
  }

  async getAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async getById(id: string): Promise<Track> {
    return this.prisma.track.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.getById(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return this.prisma.track.update({
      where: {
        id,
      },
      data
    });
  }

  async remove(id: string) {
    const track = await this.getById(id)

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.prisma.track.delete({
      where: {
        id,
      },
    });

    return { status: 'ok' };
  }
}
