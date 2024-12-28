import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma.service';
import { hash, verify } from 'argon2';

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
        password: await hash(password),
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

  async getByEmail(login: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { login } });
  }

  async updatePassword(id: string, dto: UpdatePasswordDto): Promise<User> {
    const { password, ...user } = await this.validateUser(id, dto);
    console.log('password excluded', password);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: await hash(dto.newPassword),
        updatedAt: Date.now(),
        version: user.version + 1,
      },
    });
  }

  private async validateUser(id: string, dto: UpdatePasswordDto) {
    const user = await this.getById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await verify(user.password, dto.oldPassword);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
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
