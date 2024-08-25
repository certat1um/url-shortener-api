import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortUrl } from '../schemas/shortUrl.schema';
import { CreateShortenDto } from './dto/CreateShorten.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as dotenv from 'dotenv';
dotenv.config();

const { BASE_URL } = process.env;

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectModel(ShortUrl.name) private shortUrlModel: Model<ShortUrl>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getByCode(code: string): Promise<string> {
    const cachedFullUrl: string | null = await this.cacheManager.get(code);
    const shortUrlPath = `${BASE_URL}/${code}`;
    let shortUrl: ShortUrl;

    if (!cachedFullUrl) {
      shortUrl = await this.shortUrlModel.findOne({
        short: shortUrlPath,
      });

      if (!shortUrl) {
        throw new NotFoundException('Short url not found');
      }

      // Storing in cache
      await this.cacheManager.set(code, shortUrl.full);
    }

    // Update clicks
    await this.shortUrlModel
      .findOneAndUpdate({ short: shortUrlPath }, { $inc: { clicks: 1 } })
      .exec();

    return cachedFullUrl || shortUrl.full;
  }

  async getStatsByCode(code: string): Promise<Pick<ShortUrl, 'clicks'>> {
    const shortUrlPath = `${BASE_URL}/${code}`;
    const shortUrl = await this.shortUrlModel.findOne({ short: shortUrlPath });

    if (!shortUrl) {
      throw new NotFoundException('Short url not found');
    }

    return { clicks: shortUrl.clicks };
  }

  async create(createShortenDto: CreateShortenDto): Promise<ShortUrl> {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let shortUrlPath = `${BASE_URL}/`;
    for (let i = 0; i < 6; i++) {
      shortUrlPath += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return await this.shortUrlModel.create({
      ...createShortenDto,
      short: shortUrlPath,
    });
  }
}
