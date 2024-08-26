import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortUrl, ShortUrlSchema } from './schema/shortUrl.schema';
import { ShortUrlService } from './shortUrl.service';
import { ShortUrlController } from './shortUrl.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Redis } from 'ioredis';
import * as dotenv from 'dotenv';
dotenv.config();

const { REDIS_HOST, REDIS_PORT, REDIS_USER, REDIS_PASSWORD } = process.env;

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShortUrl.name, schema: ShortUrlSchema },
    ]),
  ],
  controllers: [ShortUrlController],
  providers: [
    ShortUrlService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        // @ts-expect-error
        return new Redis({
          username: REDIS_USER,
          host: REDIS_HOST,
          password: REDIS_PASSWORD,
          port: +REDIS_PORT,
          tls: true,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class ShortUrlModule {}
