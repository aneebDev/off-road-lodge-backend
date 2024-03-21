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
import { FaqsService } from './faqs.service'
import { CreateFaqDto } from './dto/create-faq.dto'
import { UpdateFaqDto } from './dto/update-faq.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard'
import { Roles } from '../../decorators/role.decorators'
import { Role } from '../../enums/role.enum'
import { Faq } from './entities/faq.entity'

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @ApiTags('Faqs')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Post('/')
  async create(@Body() createFaqDto: CreateFaqDto) {
    try {
      const faq: Faq = await this.faqsService.create(createFaqDto)
      return {
        statusCode: 201,
        message: 'Faq created successfully',
        data: faq
      }
    } catch (e) {
      return { statusCode: 400, message: e.message, data: {} }
    }
  }

  @ApiTags('Faqs')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Get('/')
  async findAll() {
    const faq: Faq[] = await this.faqsService.findAll()
    if (!faq) {
      throw new NotFoundException('Faqs does not exist')
    }
    return {
      statusCode: 200,
      message: 'Faqs fetched successfully',
      faq
    }
  }

  @ApiTags('Faqs')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    const faq = await this.faqsService.findOneById(id)
    if (!faq) {
      throw new NotFoundException('Faq does not exist')
    }
    return {
      statusCode: 200,
      message: 'Faq fetched successfully',
      faq
    }
  }

  @ApiTags('Faqs')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    const faq = await this.faqsService.update(id, updateFaqDto)
    if (!faq) {
      throw new NotFoundException('Faq does not exist')
    }
    return {
      statusCode: 200,
      message: 'Faq updated successfully',
      faq
    }
  }

  @ApiTags('Faqs')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const faq = await this.faqsService.delete({ id })
    if (!faq) {
      throw new NotFoundException('Faq does not exist')
    }
    return {
      statusCode: 200,
      message: 'Faq deleted successfully',
      faq
    }
  }
}
