import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private state: DbService) {}

  async create({ grammy, name }: CreateArtistDto): Promise<Artist> {
    const index = this.state.db.artists.push({
      name,
      id: uuidv4(),
      grammy,
    });

    return this.state.db.artists[index - 1];
  }

  async getAll(): Promise<Artist[]> {
    return this.state.db.artists;
  }

  async getById(id: string): Promise<Artist> {
    return this.state.db.artists.find((artist) => artist.id === id);
  }

  async update(id: string, { grammy, name }: UpdateArtistDto): Promise<Artist> {
    const result = await this.getById(id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }

    result.grammy = typeof grammy === 'boolean' ? grammy : result.grammy;
    result.name = name || result.name;

    return result;
  }

  remove(id: string) {
    const index = this.state.db.artists.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.state.db.artists.splice(index, 1);

    return { status: 'ok' };
  }
}
