import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [TrackModule, AlbumModule, ArtistModule],
  controllers: [FavsController],
  providers: [FavsService, PrismaService],
})
export class FavsModule {}
