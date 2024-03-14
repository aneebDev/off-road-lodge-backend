import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Role } from '../../../enums/role.enum'
import { ApiProperty } from '@nestjs/swagger'

export class SignUpUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNo: string

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string

  @ApiProperty({ required: false, default: Role.CUSTOMER })
  @IsOptional()
  roles: string
}
