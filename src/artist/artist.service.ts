import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateArtistDto): Promise<Artist> {
     return this.prisma.artist.create({
      data,
    });
  }

  async getAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async getById(id: string): Promise<Artist> {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateArtistDto): Promise<Artist> {
    const artist = await this.getById(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.prisma.artist.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const artist = await this.getById(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.prisma.artist.delete({
      where: {
        id,
      },
    });

    return { status: 'ok' };
  }
}
