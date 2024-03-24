import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
  exports: [ArtistService],
})
export class ArtistModule {}
