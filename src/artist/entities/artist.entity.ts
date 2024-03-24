import { Artist as ArtistPrisma } from '@prisma/client';

export class Artist implements ArtistPrisma {
  id: string;
  name: string;
  grammy: boolean;


}
