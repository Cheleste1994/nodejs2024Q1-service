import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const { req } = GqlExecutionContext.create(context).getContext();

    return data ? req.user?.[data] : req.user;
  },
);
