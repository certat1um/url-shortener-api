import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateShortenDto {
  @ApiProperty({ description: 'full original url', example: 'www.google.com' })
  @IsUrl()
  full: string;
}
