import { ApiProperty } from '@nestjs/swagger'
export class LoginUserDto {
  @ApiProperty({ type: String, required: true, example: 'email goes here' })
  email: string

  @ApiProperty({ type: String, required: true, example: 'password goes here' })
  password: string
}
