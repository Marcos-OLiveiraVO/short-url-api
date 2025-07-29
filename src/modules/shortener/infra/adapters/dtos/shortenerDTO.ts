import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength, IsInt, Min, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateShortenerDTO {
  @ApiProperty({
    description: 'Profile ID associated with this shortened URL (optional)',
    example: 1,
    required: false,
  })
  @IsOptional({ message: 'profileId is required' })
  @IsInt({ message: 'profileId must be an integer' })
  @Min(1, { message: 'profileId must be at least 1' })
  profileId?: number;

  @ApiProperty({
    description: 'A descriptive name for the shortened URL',
    example: 'My personal blog',
    maxLength: 255,
    required: false,
  })
  @IsOptional({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @MaxLength(255, { message: 'name must be at max 255 characters' })
  name?: string;

  @ApiProperty({
    description: 'The original URL to be shortened',
    example: 'https://example.com/some/long/path',
    maxLength: 2048,
  })
  @IsString({ message: 'originalUrl must be a string' })
  @IsUrl({ require_tld: false, require_protocol: true }, { message: 'originalUrl must be a valid URL' })
  @MaxLength(2048, { message: 'originalUrl must be at max 2048 characters' })
  @IsNotEmpty({ message: 'originalUrl is required' })
  originalUrl: string;
}

export class BasePaginationDTO {
  @ApiProperty({
    example: 1,
    description: 'Page number for pagination (optional)',
    required: false,
    minimum: 1,
  })
  @IsOptional({ message: 'page is optional' })
  @IsNumber({}, { message: 'page must be a number' })
  @IsPositive({ message: 'page must be a positive number' })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page (optional)',
    required: false,
    minimum: 1,
  })
  @IsOptional({ message: 'limit is optional' })
  @IsNumber({}, { message: 'limit must be a number' })
  @IsPositive({ message: 'limit must be a positive number' })
  limit: number;
}

export class GetAllShortenerUrlsDTO extends BasePaginationDTO {}
