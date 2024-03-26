import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Query
} from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard'
import { Roles } from '../../decorators/role.decorators'
import { Role } from '../../enums/role.enum'
import { userPost } from './entities/post.entity'
import AuthBearer from '../../decorators/auth-bearer.decorators'
import { likeDislikePostDto } from './dto/like-dislike-post.dto'
import paginationInterface from './interfaces/pagination.interface'
import paginationContactInterface from '../contact-us/interfaces/paginationContactInterface'

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Post('/')
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      const post: userPost = await this.postService.create(createPostDto)
      return {
        statusCode: 201,
        message: 'Post created successfully',
        data: post
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
    const post: userPost[] = await this.postService.findAll()
    if (!post) {
      throw new NotFoundException('Post does not exist')
    }
    return {
      statusCode: 200,
      message: 'Post fetched successfully',
      post
    }
  }

  // Post like count
  // @ApiBearerAuth()
  // @ApiQuery({ name: 'page', type: Number, required: true })
  // @ApiQuery({ name: 'pageSize', type: Number, required: false })
  // @Get('likeDislikeCount')
  // async postLikeCount(@Query('page') page = 1, @Query('pageSize') pageSize = 10) : Promise<paginationInterface> {
  //   return this.postService.postLikeCount(page, pageSize)
  // }

  //get all contact_us users
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', type: Number, required: true })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'id', type: String, required: false })
  @Get('/:all_user')
  @Roles(Role.CUSTOMER)
  async getAllPosts(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('id') id?: string,
  ): Promise<paginationInterface> {
    return this.postService.getAllPostsWithPagination(page, pageSize, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    const post = await this.postService.findOneById(id)
    if (!post) {
      throw new NotFoundException('Post does not exist')
    }
    return {
      statusCode: 200,
      message: 'Post fetched successfully',
      post
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postService.update(id, updatePostDto)
    if (!post) {
      throw new NotFoundException('Post does not exist')
    }
    return {
      statusCode: 200,
      message: 'Post updated successfully',
      post
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const post = await this.postService.delete({ id })
    if (!post) {
      throw new NotFoundException('Post does not exist')
    }
    return {
      statusCode: 200,
      message: 'Post deleted successfully',
      post
    }
  }

  //like dislike submit review
  @ApiBearerAuth()
  // @UseInterceptors(LoggingInterceptor)
  @ApiBody({ type: likeDislikePostDto })
  @Post('likeDislike')
  // @BlockRoles(BlockRole.UNBLOCK)
  async createLikeDislike(@Body() Post: likeDislikePostDto, @AuthBearer() accessToken: string) {
    return this.postService.createLikeDislike(Post, accessToken)
  }
}
