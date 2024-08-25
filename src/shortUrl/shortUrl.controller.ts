import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { ShortUrlService } from './shortUrl.service';
import { CreateShortenDto } from './dto/CreateShorten.dto';
import { ShortUrl } from 'src/schemas/shortUrl.schema';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateDecorators,
  GetByCodeDecorators,
  GetStatsByCodeDecorators,
} from './shortUrl.swagger';

@ApiTags('shortUrl')
@Controller()
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @CacheKey('codes')
  @GetByCodeDecorators()
  @Redirect()
  @Get('/:code')
  async getByCode(@Param('code') code: string): Promise<{ url: string }> {
    const originalUrl = await this.shortUrlService.getByCode(code);
    return { url: originalUrl };
  }

  @GetStatsByCodeDecorators()
  @Get('/stats/:code')
  async getStatsByCode(
    @Param('code') code: string,
  ): Promise<Pick<ShortUrl, 'clicks'>> {
    return this.shortUrlService.getStatsByCode(code);
  }

  @CreateDecorators()
  @Post('/shorten')
  async create(@Body() createShortenDto: CreateShortenDto): Promise<ShortUrl> {
    return this.shortUrlService.create(createShortenDto);
  }
}
