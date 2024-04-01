import { Controller, Header, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { Body, Request, Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

import { AuthDto } from './dto/auth.dto';
import { Auth } from './entities/user.entity';

@ApiTags('Auth')
@Controller('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Query(() => Auth, { name: 'login' })
  // async login(@Args('dto') dto: AuthDto, @GraphRes() res: Response) {
  //   const { refreshToken, ...data } = await this.authService.login(dto);
  //   this.authService.addRefreshTokenToResponse(res, refreshToken);
  //   return data;
  // }

  @Post()
  @HttpCode(201)
  @Header('Accept', 'application/json')
  async signup(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.register(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  // @Query(() => Auth, { name: 'getNewTokens' })
  // async getNewTokens(@Request() req: Request, @GraphRes() res: Response) {
  //   const refreshTokenFromCokkies = req.cookies[this.authService.REFRESH_TOKEN_NAME];

  //   if (!refreshTokenFromCokkies) {
  //     this.authService.removeRefreshTokenToResponse(res);
  //     throw new UnauthorizedException('Refresh token not passed');
  //   }

  //   try {
  //     const { refreshToken, ...response } = await this.authService.getNewTokens(
  //       refreshTokenFromCokkies,
  //     );

  //     this.authService.addRefreshTokenToResponse(res, refreshToken);

  //     return response;
  //   } catch (Error) {
  //     this.authService.removeRefreshTokenToResponse(res);
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }

  // @Query(() => Boolean, { name: 'logout' })
  // async logout(@GraphRes() res: Response) {
  //   this.authService.removeRefreshTokenToResponse(res);
  //   return true;
  // }
}
