import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const GraphReq = createParamDecorator(
  (data: unknown, context: ExecutionContext): Request => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req;
  },
);
