import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard'
import { Roles } from '../../decorators/role.decorators'
import { Role } from '../../enums/role.enum'
import { Comment } from './entities/comment.entity'

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Post('/')
  async create(@Body() createCommentDto: CreateCommentDto) {
    try {
      const comment: Comment = await this.commentService.create(createCommentDto)
      return {
        statusCode: 201,
        message: 'Comment created successfully',
        data: comment
      }
    } catch (e) {
      return { statusCode: 400, message: e.message, data: {} }
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Get('/')
  async findAll() {
    const comment: Comment[] = await this.commentService.findAll()
    if (!comment) {
      throw new NotFoundException('Comment does not exist')
    }
    return {
      statusCode: 200,
      message: 'Comment fetched successfully',
      comment
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    const comment = await this.commentService.findOneById(id)
    if (!comment) {
      throw new NotFoundException('Comment does not exist')
    }
    return {
      statusCode: 200,
      message: 'Comment fetched successfully',
      comment
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentService.update(id, updateCommentDto)
    if (!comment) {
      throw new NotFoundException('Comment does not exist')
    }
    return {
      statusCode: 200,
      message: 'Comment updated successfully',
      comment
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const comment = await this.commentService.delete({ id })
    if (!comment) {
      throw new NotFoundException('Comment does not exist')
    }
    return {
      statusCode: 200,
      message: 'Comment deleted successfully',
      comment
    }
  }
}
