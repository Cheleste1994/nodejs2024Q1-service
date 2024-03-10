import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private state: DbService) {}

  async create({ artistId, name, year }: CreateAlbumDto): Promise<Album> {
    const index = this.state.db.albums.push({
      name,
      id: uuidv4(),
      year,
      artistId,
    });

    return this.state.db.albums[index - 1];
  }

  async getAll(): Promise<Album[]> {
    return this.state.db.albums;
  }

  async getById(id: string): Promise<Album> {
    return this.state.db.albums.find((artist) => artist.id === id);
  }

  async update(
    id: string,
    { name, artistId, year }: UpdateAlbumDto,
  ): Promise<Album> {
    const result = await this.getById(id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }

    result.artistId = artistId || result.artistId;
    result.name = name || result.name;
    result.year = year || result.year;

    return result;
  }

  remove(id: string) {
    const index = this.state.db.albums.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.state.db.albums.splice(index, 1);

    return { status: 'ok' };
  }
}
