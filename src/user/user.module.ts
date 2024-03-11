import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DbService],
})
export class UserModule {}
