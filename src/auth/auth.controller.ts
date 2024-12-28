import {
  Controller,
  Header,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Body,
  Res,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @Header('Accept', 'application/json')
  async login(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, ...tokens } = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, tokens.refreshToken);
    return { ...tokens, ...user };
  }

  @Post('signup')
  @HttpCode(201)
  @Header('Accept', 'application/json')
  async signup(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, ...tokens } = await this.authService.register(dto);

    this.authService.addRefreshTokenToResponse(res, tokens.refreshToken);

    return { ...tokens, ...user };
  }

  @Post('refresh')
  @HttpCode(200)
  @Header('Accept', 'application/json')
  async getNewTokens(
    @Body() { refreshToken }: { refreshToken: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromBody = refreshToken;

    if (!refreshTokenFromBody) {
      this.authService.removeRefreshTokenToResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    try {
      const { refreshToken, ...response } = await this.authService.getNewTokens(
        refreshTokenFromBody,
      );

      this.authService.addRefreshTokenToResponse(res, refreshToken);

      return response;
    } catch (Error) {
      this.authService.removeRefreshTokenToResponse(res);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // @Query(() => Boolean, { name: 'logout' })
  // async logout(@GraphRes() res: Response) {
  //   this.authService.removeRefreshTokenToResponse(res);
  //   return true;
  // }
}
