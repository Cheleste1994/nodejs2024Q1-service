import { Track as TrackPrisma } from '@prisma/client';

export class Track implements TrackPrisma {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;
}
