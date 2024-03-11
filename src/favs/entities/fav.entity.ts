import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
