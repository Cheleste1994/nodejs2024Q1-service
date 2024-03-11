import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
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
    const id = uuidv4();

    this.state.db.tracks[id] = {
      name,
      id,
      duration,
      albumId: albumId || null,
      artistId: artistId || null,
    };

    return this.state.db.tracks[id];
  }

  async getAll(): Promise<Track[]> {
    return Object.values(this.state.db.tracks);
  }

  async getById(id: string): Promise<Track> {
    return this.state.db.tracks[id] || null;
  }

  async update(
    id: string,
    { albumId, artistId, duration, name }: UpdateTrackDto,
  ): Promise<Track> {
    const track = this.state.db.tracks[id];

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    track.albumId = albumId || track.albumId;
    track.artistId = artistId || track.artistId;
    track.duration = duration || track.duration;
    track.name = name || track.name;

    return track;
  }

  async remove(id: string) {
    if (!this.state.db.tracks[id]) {
      throw new NotFoundException('Track not found');
    }

    const indexTrack = this.state.db.favorites.tracks.indexOf(id);
    if (indexTrack !== -1) {
      this.state.db.favorites.tracks.splice(indexTrack, 1);
    }

    delete this.state.db.tracks[id];

    return { status: 'ok' };
  }
}
