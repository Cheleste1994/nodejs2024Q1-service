import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { Album } from 'src/album/entities/album.entity';
import { ArtistService } from 'src/artist/artist.service';
import { Artist } from 'src/artist/entities/artist.entity';
import { DbService } from 'src/db.service';
import { Track } from 'src/track/entities/track.entity';
import { TrackService } from 'src/track/track.service';
import { Favorites } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    private state: DbService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  async getAll(): Promise<Favorites> {
    return this.state.db.favorites;
  }

  async addTrack(id: string): Promise<Track> {
    const result = await this.trackService.getById(id);

    if (!result) {
      throw new UnprocessableEntityException('Track not found');
    }
    const index = this.state.db.favorites.tracks.push(result);

    return this.state.db.favorites.tracks[index - 1];
  }

  removeTrack(id: string) {
    const index = this.state.db.favorites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    this.state.db.favorites.tracks.splice(index, 1);

    return { status: 'ok' };
  }

  async addAlbum(id: string): Promise<Album> {
    const result = await this.albumService.getById(id);

    if (!result) {
      throw new UnprocessableEntityException('Album not found');
    }
    const index = this.state.db.favorites.albums.push(result);

    return this.state.db.favorites.albums[index - 1];
  }

  removeAlbum(id: string) {
    const index = this.state.db.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.state.db.favorites.tracks.splice(index, 1);

    return { status: 'ok' };
  }

  async addArtist(id: string): Promise<Artist> {
    const result = await this.artistService.getById(id);

    if (!result) {
      throw new UnprocessableEntityException('Artist not found');
    }
    const index = this.state.db.favorites.artists.push(result);

    return this.state.db.favorites.artists[index - 1];
  }

  removeArtist(id: string) {
    const index = this.state.db.favorites.artists.findIndex(
      (Artist) => Artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.state.db.favorites.tracks.splice(index, 1);

    return { status: 'ok' };
  }
}
