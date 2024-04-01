import { SetMetadata } from '@nestjs/common';

export const AuthAnyway = (arg: boolean | undefined = true) =>
  SetMetadata('auth-anyway', arg);
