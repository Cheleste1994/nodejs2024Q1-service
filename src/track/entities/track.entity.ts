import { Track as TrackPrisma } from '@prisma/client';

export class Track implements TrackPrisma {
  id: string;
  name: string;
  duration: number;
  artistId: string;
  albumId: string;
}
