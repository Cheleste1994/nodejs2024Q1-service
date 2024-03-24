import {User as UserPrisma} from '@prisma/client'

export class User implements UserPrisma{
  id: string;
  createdAt: Date;
  updatedAt: Date;
  login: string;
  password: string;
  version: number;

}
