import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateCommentDto {
  @ApiProperty({ nullable: false, type: String, required: true })
  @IsString()
  @IsNotEmpty()
  description: string
}
