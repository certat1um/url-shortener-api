import { getModelToken } from '@nestjs/mongoose';
import { ShortUrlService } from './shortUrl.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ShortUrl } from '..//schemas/shortUrl.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CreateShortenDto } from './dto/CreateShorten.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('ShortUrlService', () => {
  let shortUrlService: ShortUrlService;
  let shortUrlRepository: Model<ShortUrl>;

  const SHORT_URL_TOKEN = getModelToken('ShortUrl');

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ShortUrlService,
        {
          provide: SHORT_URL_TOKEN,
          useValue: {
            findOne: jest.fn(),
            updateOne: jest.fn(),
            exec: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: 'REDIS_CLIENT',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    shortUrlService = moduleRef.get<ShortUrlService>(ShortUrlService);
    shortUrlRepository = moduleRef.get<Model<ShortUrl>>(SHORT_URL_TOKEN);
  });

  it('all services should be defined', () => {
    expect(shortUrlService).toBeDefined();
    expect(shortUrlRepository).toBeDefined();
  });

  describe('getByCode', () => {
    it('200 should return a code', async () => {
      const expected = 'https://example.com';

      (shortUrlRepository.findOne as jest.Mock).mockResolvedValue({
        full: expected,
      });
      (shortUrlRepository.updateOne as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await shortUrlService.getByCode('TeSt12');
      expect(result).toEqual(expected);
      expect(shortUrlRepository.updateOne).toHaveBeenCalled();
      expect(shortUrlRepository.updateOne().exec).toHaveBeenCalled();
    });

    it('404 short url not found', async () => {
      const expected = new NotFoundException('Short url not found');

      const result = shortUrlService.getByCode('TeSt12');
      expect(result).rejects.toThrow(expected);
    });
  });

  describe('getStatsByCode', () => {
    it('200 should return clicks stats', async () => {
      const expected = {
        clicks: 0,
      };

      (shortUrlRepository.findOne as jest.Mock).mockResolvedValue(expected);

      const result = await shortUrlService.getStatsByCode('TeSt12');
      expect(result).toEqual(expected);
    });

    it('404 short url not found', async () => {
      const expected = new NotFoundException('Short url not found');

      const result = shortUrlService.getByCode('TeSt12');
      expect(result).rejects.toThrow(expected);
    });
  });

  describe('create', () => {
    it('200 should create short url', async () => {
      const createShortenDto: CreateShortenDto = {
        full: 'www.example.com',
      };
      const expected = {
        full: createShortenDto.full,
        short: `${process.env.BASE_URL}/TeSt12`,
        clicks: 0,
      };

      (shortUrlRepository.create as jest.Mock).mockResolvedValue(expected);

      const result = await shortUrlService.create(createShortenDto);

      expect(result).toEqual(expected);
    });
  });
});
