import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './track/entities/track.entity';

interface DB {
  users: User[];
  tracks: Track[];
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
    };
  }

  async onModuleInit() {
    this.db;
  }
}
