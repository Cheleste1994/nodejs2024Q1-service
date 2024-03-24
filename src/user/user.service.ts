import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ login, password }: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });

    if (user) {
      throw new ForbiddenException('Login register');
    }

    return this.prisma.user.create({
      data: {
        login,
        password,
        createdAt: Date.now(),
        updatedAt: Date.now(),
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
    const user = await this.getById(id);

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
        updatedAt: Date.now(),
        version: user.version + 1,
      },
    });
  }

  async remove(id: string) {
    const user = await this.getById(id);

    if (!user) {
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
