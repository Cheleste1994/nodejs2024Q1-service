import {User as UserPrisma} from '@prisma/client'

export class User implements UserPrisma{
  id: string;
  createdAt: number;
  updatedAt: number;
  login: string;
  password: string;
  version: number;


}
