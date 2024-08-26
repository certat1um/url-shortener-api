import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ShortUrlModule } from './shortUrl/shortUrl.module';
import * as dotenv from 'dotenv';
import { ThrottlerModule } from '@nestjs/throttler';
dotenv.config();

const { DB_USER, DB_PASS } = process.env;

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${DB_USER}:${DB_PASS}@maincluster.wbz3b.mongodb.net/`,
    ),
    ShortUrlModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
