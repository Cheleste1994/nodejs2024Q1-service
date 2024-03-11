import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Favorites } from '../favs/entities/fav.entity';

interface DB {
  users: { [key: string]: User };
  tracks: { [key: string]: Track };
  artists: { [key: string]: Artist };
  albums: { [key: string]: Album };
  favorites: Favorites;
}

@Injectable()
export class DbService implements OnModuleInit {
  db: DB;

  constructor() {
    this.db = {
      users: {},
      tracks: {},
      artists: {},
      albums: {},
      favorites: {
        albums: [],
        artists: [],
        tracks: [],
      },
    };
  }

  async onModuleInit() {
    this.db;
  }
}
