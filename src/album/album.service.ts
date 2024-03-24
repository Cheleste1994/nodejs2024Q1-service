import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create({ name, year, artistId }: CreateAlbumDto): Promise<Album> {
    return this.prisma.album.create({
      data: {
        name,
        year,
        artistId,
      },
    });
  }

  async getAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async getById(id: string): Promise<Album> {
    return this.prisma.album.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateAlbumDto): Promise<Album> {
    const album = await this.getById(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.prisma.album.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const album = await this.getById(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.prisma.album.delete({
      where: {
        id,
      },
    });

    return { status: 'ok' };
  }
}
