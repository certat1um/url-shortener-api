import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ShortUrl {
  @Prop({ required: true })
  full: string;

  @Prop({ required: true, unique: true })
  short: string;

  @Prop({ required: true, default: 0 })
  clicks: number;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
