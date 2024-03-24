import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Name identifier',
    required: true,
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Year identifier',
    required: true,
    type: 'number',
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'artistId identifier',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  artistId: string;
}
