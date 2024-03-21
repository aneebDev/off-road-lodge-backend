import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class likeDislikePostDto{
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  postId: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  likeCount: number;
}