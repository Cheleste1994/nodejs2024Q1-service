import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './track/entities/track.entity';
import { Artist } from './artist/entities/artist.entity';
import { Album } from './album/entities/album.entity';
import { Favorites } from './favs/entities/fav.entity';

interface DB {
  users: User[];
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  favorites: Favorites;
}

@Injectable()
export class DbService implements OnModuleInit {
  db: DB;

  constructor() {
    this.db = {
      users: [
        {
          createdAt: 12312312312,
          updatedAt: 12312312312,
          id: uuidv4(),
          login: 'Andrei',
          password: '1',
          version: 1,
        },
      ],
      tracks: [
        {
          id: uuidv4(),
          albumId: null,
          artistId: null,
          duration: 199,
          name: 'Track',
        },
      ],
      artists: [
        {
          id: uuidv4(),
          grammy: true,
          name: 'Artist',
        },
      ],
      albums: [
        {
          id: uuidv4(),
          artistId: '',
          year: 20,
          name: 'Artist',
        },
      ],
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
