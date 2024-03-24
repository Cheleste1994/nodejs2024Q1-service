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
import { PrismaService } from 'src/prisma.service';
import { Track } from 'src/track/entities/track.entity';
import { TrackService } from 'src/track/track.service';
import { FavoritesResponse } from './entities/fav.entity';

@Injectable()
export class FavsService {
  favsId: string;

  constructor(
    private state: DbService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
    private prisma: PrismaService,
  ) {
    this.addInitialState();
  }

  async addInitialState() {
    const { id } = await this.prisma.favorites.create({
      data: {
        albums: [],
        artists: [],
        tracks: [],
      },
    });

    this.favsId = id;
  }

  async getAll(): Promise<FavoritesResponse> {
    const {artists, tracks, albums} = await this.getFavorites()

    return { albums, artists, tracks };
  }

  async getFavorites() {
    return this.prisma.favorites.findUnique({
      where: {
        id: this.favsId,
      },
    });
  }

  async addTrack(id: string): Promise<Track> {
    const result = await this.trackService.getById(id);

    if (!result) {
      throw new UnprocessableEntityException('Track not found');
    }
    const { tracks } = await this.getFavorites();

    if (!tracks.includes(id)) {
      await this.prisma.favorites.update({
        where: {
          id: this.favsId,
        },
        data: {
          tracks: {
            push: id,
          },
        },
      });
    }
    return result;
  }

  async removeTrack(id: string) {
    const {tracks} = await this.getFavorites();

    if (!tracks.includes(id)) {
      throw new NotFoundException('Track not found');
    }

    await this.prisma.favorites.update({
      where: {
        id: this.favsId
      },
      data: {
        tracks: {
          set: tracks.filter((track) => track !== id)
        }
      }
    })

    return { status: 'ok' };
  }

  async addAlbum(id: string): Promise<Album> {
    const result = await this.albumService.getById(id);

    if (!result) {
      throw new UnprocessableEntityException('Album not found');
    }

    const { albums } = await this.getFavorites();

    if (!albums.includes(id)) {
      await this.prisma.favorites.update({
        where: {
          id: this.favsId,
        },
        data: {
          albums: {
            push: id,
          },
        },
      });
    }
    return result;
  }

  async removeAlbum(id: string) {
    const {albums} = await this.getFavorites();

    if (!albums.includes(id)) {
      throw new NotFoundException('Album not found');
    }

    await this.prisma.favorites.update({
      where: {
        id: this.favsId
      },
      data: {
        albums: {
          set: albums.filter((track) => track !== id)
        }
      }
    })

    return { status: 'ok' };
  }

  async addArtist(id: string): Promise<Artist> {
    const result = await this.artistService.getById(id);

    if (!result) {
      throw new UnprocessableEntityException('Artist not found');
    }
    const { artists } = await this.getFavorites();

    if (!artists.includes(id)) {
      await this.prisma.favorites.update({
        where: {
          id: this.favsId,
        },
        data: {
          artists: {
            push: id,
          },
        },
      });
    }
    return result;
  }

  async removeArtist(id: string) {
    const {artists} = await this.getFavorites();

    if (!artists.includes(id)) {
      throw new NotFoundException('Artist not found');
    }

    await this.prisma.favorites.update({
      where: {
        id: this.favsId
      },
      data: {
        artists: {
          set: artists.filter((track) => track !== id)
        }
      }
    })


    return { status: 'ok' };
  }
}
