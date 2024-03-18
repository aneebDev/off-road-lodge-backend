import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateContactUsDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string
}
