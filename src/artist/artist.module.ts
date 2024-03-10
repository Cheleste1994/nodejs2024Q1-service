import { Module } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DbService],
})
export class ArtistModule {}
