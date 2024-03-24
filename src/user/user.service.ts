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
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private state: DbService, private prisma: PrismaService) {}

  async create({ login, password }: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        login,
        password,
        version: 1,
      },
    });
  }

  async getAll(): Promise<User[] | null> {
    return this.prisma.user.findMany();
  }

  async getById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updatePassword(
    id: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Invalid old password');
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
    });
  }

  async remove(id: string) {
    if (!this.state.db.users[id]) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return { status: 'ok' };
  }
}
