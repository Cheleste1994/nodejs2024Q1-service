import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private state: DbService) {}

  async create({
    albumId,
    artistId,
    duration,
    name,
  }: CreateTrackDto): Promise<Track> {
    const index = this.state.db.tracks.push({
      name,
      id: uuidv4(),
      duration,
      albumId: albumId || null,
      artistId: artistId || null,
    });

    return this.state.db.tracks[index - 1];
  }

  async getAll(): Promise<Track[]> {
    return this.state.db.tracks;
  }

  async getById(id: string): Promise<Track> {
    return this.state.db.tracks.find((track) => track.id === id);
  }

  async update(
    id: string,
    { albumId, artistId, duration, name }: UpdateTrackDto,
  ): Promise<Track> {
    const result = await this.getById(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }

    result.albumId = albumId || result.albumId;
    result.artistId = artistId || result.artistId;
    result.duration = duration || result.duration;
    result.name = name || result.name;

    return result;
  }

  remove(id: string) {
    const index = this.state.db.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    this.state.db.tracks.splice(index, 1);

    return { status: 'ok' };
  }
}
