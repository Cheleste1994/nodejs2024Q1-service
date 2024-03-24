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
    const user = await this.getById(id)

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
    const user = await this.getById(id)

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
