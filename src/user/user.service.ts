import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private state: DbService) {}

  async create({ login, password }: CreateUserDto): Promise<User> {
    const index = this.state.db.users.push({
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: uuidv4(),
      login,
      password,
      version: 1,
    });

    return this.state.db.users[index - 1];
  }

  async getAll(): Promise<User[] | null> {
    return this.state.db.users;
  }

  async getById(id: string): Promise<User | null> {
    return this.state.db.users.find((user) => user.id === id);
  }

  async updatePassword(
    id: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const result = await this.getById(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    if (result.password !== oldPassword) {
      throw new ForbiddenException('Invalid old password');
    }

    result.password = newPassword;
    result.updatedAt = Date.now();
    result.version += 1;

    return result;
  }

  async remove(id: string) {
    const index = this.state.db.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.state.db.users.splice(index, 1);

    return { status: 'ok' };
  }
}
