import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

export const IsValidUuid = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!uuidValidate(request.params?.id || '')) {
      throw new BadRequestException('Not uuid');
    }
  },
);
