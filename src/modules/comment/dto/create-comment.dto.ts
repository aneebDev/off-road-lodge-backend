import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({ nullable: false, type: String, required: true })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ nullable: false, type: String, required: true })
  @IsString()
  @IsNotEmpty()
  userId: string
}
