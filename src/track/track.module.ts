import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbService } from 'src/db.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, DbService],
})
export class TrackModule {}
