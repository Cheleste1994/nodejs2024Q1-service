import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

interface DB {
  users: User[];
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
    };
  }

  async onModuleInit() {
    this.db;
  }
}
