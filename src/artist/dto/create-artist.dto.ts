import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'Name identifier',
    required: true,
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Grammy identifier',
    required: true,
    type: 'boolean',
  })
  @IsBoolean()
  grammy: boolean;
}
