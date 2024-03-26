import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, Query } from '@nestjs/common'
import { PlaceService } from './place.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard'
import { Roles } from '../../decorators/role.decorators'
import { Role } from '../../enums/role.enum'
import { CreatePlaceDto } from './dto/create-place.dto'
import { Place } from './entities/place.entity'
import { UpdatePlaceDto } from './dto/update-place.dto'

@ApiTags('Places')
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Post('/')
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    try {
      const place: Place = await this.placeService.create(createPlaceDto)
      return {
        statusCode: 201,
        message: 'Place Host created successfully',
        data: place
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
    const places: Place[] = await this.placeService.findAll()
    if (!places) {
      throw new NotFoundException('Places does not exist')
    }
    return {
      statusCode: 200,
      message: 'Places fetched successfully',
      places
    }
  }

  // Post like count
  // @ApiBearerAuth()
  // @ApiQuery({ name: 'page', type: Number, required: true })
  // @ApiQuery({ name: 'pageSize', type: Number, required: false })
  // @Get('likeDislikeCount')
  // async postLikeCount(@Query('page') page = 1, @Query('pageSize') pageSize = 10) : Promise<paginationInterface> {
  //   return this.placeService.postLikeCount(page, pageSize)
  // }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    const post = await this.placeService.findOneById(id)
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
  async update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    const post = await this.placeService.update(id, updatePlaceDto)
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
    const post = await this.placeService.delete({ id })
    if (!post) {
      throw new NotFoundException('Post does not exist')
    }
    return {
      statusCode: 200,
      message: 'Post deleted successfully',
      post
    }
  }
}
