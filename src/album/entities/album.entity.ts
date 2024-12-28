import { Album as AlbumPrisma } from '@prisma/client';

export class Album implements AlbumPrisma {
  id: string;
  name: string;
  year: number;
  artistId: string;
}
