import { Artist as ArtistPrisma } from '@prisma/client';

export class Artist implements ArtistPrisma {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  grammy: boolean;
}
