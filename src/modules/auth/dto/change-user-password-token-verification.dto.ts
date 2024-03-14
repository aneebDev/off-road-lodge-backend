import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class changeUserPasswordTokenVerificationDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  token: string
}
