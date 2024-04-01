import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    DbModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DbService, PrismaService],
})
export class AppModule {}
