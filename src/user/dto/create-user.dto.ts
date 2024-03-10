import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Login identifier',
    required: true,
    type: 'string',
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: 'Password identifier',
    required: true,
    type: 'string',
  })
  @IsString()
  password: string;
}
