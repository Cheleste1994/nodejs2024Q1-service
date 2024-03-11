import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private state: DbService) {}

  async create({ grammy, name }: CreateArtistDto): Promise<Artist> {
    const id = uuidv4();

    this.state.db.artists[id] = {
      name,
      id,
      grammy,
    };

    return this.state.db.artists[id];
  }

  async getAll(): Promise<Artist[]> {
    return Object.values(this.state.db.artists);
  }

  async getById(id: string): Promise<Artist> {
    return this.state.db.artists[id] || null;
  }

  async update(id: string, { grammy, name }: UpdateArtistDto): Promise<Artist> {
    const artist = this.state.db.artists[id];

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    artist.grammy = typeof grammy === 'boolean' ? grammy : artist.grammy;
    artist.name = name || artist.name;

    return artist;
  }

  async remove(id: string) {
    if (!this.state.db.artists[id]) {
      throw new NotFoundException('Artist not found');
    }

    Object.values(this.state.db.tracks).forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    Object.values(this.state.db.albums).forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    const indexArtist = this.state.db.favorites.artists.indexOf(id);
    if (indexArtist !== -1) {
      this.state.db.favorites.artists.splice(indexArtist, 1);
    }

    delete this.state.db.artists[id];

    return { status: 'ok' };
  }
}
