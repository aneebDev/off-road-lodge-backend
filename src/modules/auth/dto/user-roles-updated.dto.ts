import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class userRolesUpdatedDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  roles: string
}
