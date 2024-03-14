import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class randomUserTokenDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email = ''
}
