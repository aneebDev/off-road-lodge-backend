import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class userDocumentActiveDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  documentStatus: string
}
