import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { Album } from 'src/album/entities/album.entity';
import { ArtistService } from 'src/artist/artist.service';
import { Artist } from 'src/artist/entities/artist.entity';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/track/entities/track.entity';
import { TrackService } from 'src/track/track.service';
import { FavoritesResponse } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    private state: DbService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const {
      albums: albumsId,
      artists: artistsId,
      tracks: tracksId,
    } = this.state.db.favorites;

    const albums = await Promise.all(
      albumsId.map(async (key) => await this.albumService.getById(key)),
    );
    const artists = await Promise.all(
      artistsId.map(async (key) => await this.artistService.getById(key)),
    );
    const tracks = await Promise.all(
      tracksId.map(async (key) => await this.trackService.getById(key)),
    );

    return { albums, artists, tracks };
  }

  async addTrack(id: string): Promise<Track> {
    const result = await this.trackService.getById(id);

    if (!result) {
      throw new UnprocessableEntityException('Track not found');
    }
    if (!this.state.db.favorites.tracks.includes(id)) {
      this.state.db.favorites.tracks.push(id);
    }

    return result;
  }

  removeTrack(id: string) {
    const index = this.state.db.favorites.tracks.indexOf(id);

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

    if (!this.state.db.favorites.albums.includes(id)) {
      this.state.db.favorites.albums.push(id);
    }

    return result;
  }

  removeAlbum(id: string) {
    const index = this.state.db.favorites.albums.indexOf(id);

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.state.db.favorites.albums.splice(index, 1);

    return { status: 'ok' };
  }

  async addArtist(id: string): Promise<Artist> {
    const result = await this.artistService.getById(id);

    if (!result) {
      throw new UnprocessableEntityException('Artist not found');
    }
    if (!this.state.db.favorites.artists.includes(id)) {
      this.state.db.favorites.artists.push(id);
    }

    return result;
  }

  removeArtist(id: string) {
    const index = this.state.db.favorites.artists.indexOf(id);

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.state.db.favorites.artists.splice(index, 1);

    return { status: 'ok' };
  }
}
