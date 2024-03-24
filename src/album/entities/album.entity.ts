import { Album as AlbumPrisma } from '@prisma/client';

export class Album implements AlbumPrisma{
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  year: number;
  artistId: string;

}
