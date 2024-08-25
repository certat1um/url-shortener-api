import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateShortenDto } from './dto/CreateShorten.dto';

export const GetByCodeDecorators = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Finds the original URL to redirect' }),
    ApiFoundResponse({ description: 'Redirects to original URL' }),
    ApiNotFoundResponse({ description: 'Short url not found' }),
  );
};

export const GetStatsByCodeDecorators = () => {
  return applyDecorators(
    ApiOperation({
      summary:
        'Returns statistics on the number of clicks on the passed short URL',
    }),
    ApiNotFoundResponse({ description: 'Short url not found' }),
    ApiOkResponse({ description: 'Return a short url' }),
  );
};

export const CreateDecorators = () => {
  return applyDecorators(
    ApiBody({ description: 'Short URL data', type: CreateShortenDto }),
    ApiOperation({ summary: 'Creates and returnes a short URL' }),
    ApiCreatedResponse({ description: 'Short url created and returned' }),
  );
};
