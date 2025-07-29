import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProfileDTO {
  @ApiProperty({
    description: 'Full name of the user profile',
    example: 'John Doe',
    required: true,
    minLength: 3,
    maxLength: 255,
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  name: string;

  @ApiProperty({
    description: 'Email address of the user profile',
    example: 'john.doe@example.com',
    required: true,
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @Length(3, 100, { message: 'Email must be between 3 and 100 characters' })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'SecurePass123!',
    required: true,
    minLength: 3,
    maxLength: 50,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(3, 50, { message: 'Password must be between 3 and 50 characters' })
  password: string;
}

export class ProfileLoginDTO extends OmitType(CreateProfileDTO, ['name']) {}
