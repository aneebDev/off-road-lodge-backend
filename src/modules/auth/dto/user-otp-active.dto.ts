import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class userOtpActiveDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  Otp: string

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  otpStatus: string
}
