import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    description: 'name identifier',
    required: true,
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'duration identifier',
    required: true,
    type: 'number',
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'artistId identifier',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  artistId: string | null;

  @ApiProperty({
    description: 'albumId identifier',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  albumId: string | null;
}
