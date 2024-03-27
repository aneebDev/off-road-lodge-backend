import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common'
import { GuidedToursService } from './guided-tours.service'
import { CreateGuidedTourDto } from './dto/create-guided-tour.dto'
import { UpdateGuidedTourDto } from './dto/update-guided-tour.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard'
import { Roles } from '../../decorators/role.decorators'
import { Role } from '../../enums/role.enum'
import { GuidedTour } from './entities/guided-tour.entity'

@ApiTags('GuidedTours')
@Controller('guided-tours')
export class GuidedToursController {
  constructor(private readonly guidedToursService: GuidedToursService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Post('/')
  async create(@Body() createGuidedTourDto: CreateGuidedTourDto) {
    try {
      const guidedTour: GuidedTour= await this.guidedToursService.create(createGuidedTourDto)
      return {
        statusCode: 201,
        message: 'GuidedTour Host created successfully',
        data: guidedTour
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
    const guidedTours: GuidedTour[] = await this.guidedToursService.findAll()
    if (!guidedTours) {
      throw new NotFoundException('GuidedTours does not exist')
    }
    return {
      statusCode: 200,
      message: 'GuidedTours fetched successfully',
      guidedTours
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
    const atv = await this.guidedToursService.findOneById(id)
    if (!atv) {
      throw new NotFoundException('GuidedTour does not exist')
    }
    return {
      statusCode: 200,
      message: 'GuidedTour fetched successfully',
      atv
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateGuidedTourDto: UpdateGuidedTourDto) {
    const atv = await this.guidedToursService.update(id, updateGuidedTourDto)
    if (!atv) {
      throw new NotFoundException('GuidedTour does not exist')
    }
    return {
      statusCode: 200,
      message: 'GuidedTour updated successfully',
      atv
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const atv = await this.guidedToursService.delete({ id })
    if (!atv) {
      throw new NotFoundException('GuidedTour does not exist')
    }
    return {
      statusCode: 200,
      message: 'GuidedTour deleted successfully',
      atv
    }
  }
}
