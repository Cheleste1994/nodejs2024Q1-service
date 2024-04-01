import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    const ctx = GqlExecutionContext.create(context).getHandler();
    const isAuthAnyway = this.reflector.get<boolean>('auth-anyway', ctx);

    if (!isAuthAnyway) {
      if (err || !user) {
        throw new UnauthorizedException();
      }
    }

    return user;
  }
}
