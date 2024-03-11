import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private state: DbService) {}

  async create({ artistId, name, year }: CreateAlbumDto): Promise<Album> {
    const id = uuidv4();

    this.state.db.albums[id] = {
      name,
      id,
      year,
      artistId,
    };

    return this.state.db.albums[id];
  }

  async getAll(): Promise<Album[]> {
    return Object.values(this.state.db.albums);
  }

  async getById(id: string): Promise<Album> {
    return this.state.db.albums[id] || null;
  }

  async update(
    id: string,
    { name, artistId, year }: UpdateAlbumDto,
  ): Promise<Album> {
    const album = this.state.db.albums[id];

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    album.artistId = artistId || album.artistId;
    album.name = name || album.name;
    album.year = year || album.year;

    return album;
  }

  remove(id: string) {
    if (!this.state.db.albums[id]) {
      throw new NotFoundException('Album not found');
    }

    Object.values(this.state.db.tracks).forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    const indexAlbums = this.state.db.favorites.albums.indexOf(id);
    if (indexAlbums !== -1) {
      this.state.db.favorites.albums.splice(indexAlbums, 1);
    }

    delete this.state.db.albums[id];

    return { status: 'ok' };
  }
}
