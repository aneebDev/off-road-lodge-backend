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
import { AtvService } from './atv.service'
import { CreateAtvDto } from './dto/create-atv.dto'
import { UpdateAtvDto } from './dto/update-atv.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard'
import { Roles } from '../../decorators/role.decorators'
import { Role } from '../../enums/role.enum'
import { Atv } from './entities/atv.entity'

@ApiTags('ATV')
@Controller('atv')
export class AtvController {
  constructor(private readonly atvService: AtvService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Post('/')
  async create(@Body() createAtvDto: CreateAtvDto) {
    try {
      const atv: Atv = await this.atvService.create(createAtvDto)
      return {
        statusCode: 201,
        message: 'ATV Host created successfully',
        data: atv
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
    const atvs: Atv[] = await this.atvService.findAll()
    if (!atvs) {
      throw new NotFoundException('ATV does not exist')
    }
    return {
      statusCode: 200,
      message: 'ATV fetched successfully',
      atvs
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
    const atv = await this.atvService.findOneById(id)
    if (!atv) {
      throw new NotFoundException('ATV does not exist')
    }
    return {
      statusCode: 200,
      message: 'ATV fetched successfully',
      atv
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateAtvDto: UpdateAtvDto) {
    const atv = await this.atvService.update(id, updateAtvDto)
    if (!atv) {
      throw new NotFoundException('ATV does not exist')
    }
    return {
      statusCode: 200,
      message: 'ATV updated successfully',
      atv
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const atv = await this.atvService.delete({ id })
    if (!atv) {
      throw new NotFoundException('ATV does not exist')
    }
    return {
      statusCode: 200,
      message: 'ATV deleted successfully',
      atv
    }
  }
}
