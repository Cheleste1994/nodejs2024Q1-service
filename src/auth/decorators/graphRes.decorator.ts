import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';

export const GraphRes = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.res;
  },
);
