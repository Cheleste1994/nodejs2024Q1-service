import { UnauthorizedException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GraphReq } from './decorators/graphReq.decorator';

import { GraphRes } from './decorators/graphRes.decorator';

import { AuthDto } from './dto/auth.dto';
import { Auth } from './entities/user.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Auth, { name: 'login' })
  async login(@Args('dto') dto: AuthDto, @GraphRes() res: Response) {
    const { refreshToken, ...data } = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);
    return data;
  }

  @Query(() => Auth, { name: 'register' })
  async register(@Args('dto') dto: AuthDto, @GraphRes() res: Response) {
    const { refreshToken, ...response } = await this.authService.register(dto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Query(() => Auth, { name: 'getNewTokens' })
  async getNewTokens(@GraphReq() req: Request, @GraphRes() res: Response) {
    const refreshTokenFromCokkies = req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCokkies) {
      this.authService.removeRefreshTokenToResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    try {
      const { refreshToken, ...response } = await this.authService.getNewTokens(
        refreshTokenFromCokkies,
      );

      this.authService.addRefreshTokenToResponse(res, refreshToken);

      return response;
    } catch (Error) {
      this.authService.removeRefreshTokenToResponse(res);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Query(() => Boolean, { name: 'logout' })
  async logout(@GraphRes() res: Response) {
    this.authService.removeRefreshTokenToResponse(res);
    return true;
  }
}
