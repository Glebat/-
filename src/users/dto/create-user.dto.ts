import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User ID (auto-generated)', required: false })
  id?: number;

  @ApiProperty({ description: 'First Name', example: 'John' })
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'Last Name', example: 'Doe' })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'Email Address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone Number', example: '+15551234567' })
  @IsPhoneNumber('RU')
  phone_number: string;

  @ApiProperty({ description: 'Password', example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password: string;
}
