import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private state: DbService) {}

  async create({ login, password }: CreateUserDto): Promise<User> {
    const id = uuidv4();

    this.state.db.users[id] = {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id,
      login,
      password,
      version: 1,
    };

    return this.state.db.users[id];
  }

  async getAll(): Promise<User[] | null> {
    return Object.values(this.state.db.users);
  }

  async getById(id: string): Promise<User | null> {
    return this.state.db.users[id] || null;
  }

  async updatePassword(
    id: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = this.state.db.users[id];

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Invalid old password');
    }

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return user;
  }

  async remove(id: string) {
    if (!this.state.db.users[id]) {
      throw new NotFoundException('User not found');
    }

    delete this.state.db.users[id];

    return { status: 'ok' };
  }
}
