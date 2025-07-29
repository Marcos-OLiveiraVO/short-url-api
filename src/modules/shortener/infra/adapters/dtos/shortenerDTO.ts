import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength, IsInt, Min, IsNotEmpty } from 'class-validator';

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
