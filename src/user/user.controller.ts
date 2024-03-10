import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Put,
  Header,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IsValidUuid } from 'src/decorators/isValidUuid.decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @Header('Accept', 'application/json')
  async create(@Body() createUserDto: CreateUserDto) {
    const { password, ...result } = await this.userService.create(
      createUserDto,
    );

    console.log('password excluded', password);
    return result;
  }

  @Get()
  @HttpCode(200)
  async getAll() {
    return (await this.userService.getAll()).map(({ password, ...result }) => {
      if (!password) {
        console.log('password not found', password);
      }
      return result;
    });
  }

  @Get(':id')
  @HttpCode(200)
  @Header('Accept', 'application/json')
  async getById(@Param('id') @IsValidUuid() id: string) {
    const result = await this.userService.getById(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    const { password, ...res } = result;
    console.log('password excluded', password);

    return res;
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Accept', 'application/json')
  async update(
    @Param('id') @IsValidUuid() id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { password, ...result } = await this.userService.updatePassword(
      id,
      updatePasswordDto,
    );
    console.log('password excluded', password);

    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') @IsValidUuid() id: string) {
    return this.userService.remove(id);
  }
}
