import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'Old password identifier', nullable: false })
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'New password identifier', nullable: false })
  @IsString()
  newPassword: string;
}
