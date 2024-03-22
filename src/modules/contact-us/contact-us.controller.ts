import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException, Query
} from '@nestjs/common'
import { ContactUsService } from './contact-us.service'
import { CreateContactUsDto } from './dto/create-contact-us.dto'
import { UpdateContactUsDto } from './dto/update-contact-us.dto'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard'
import { Roles } from '../../decorators/role.decorators'
import { Role } from '../../enums/role.enum'
import { ContactUs } from './entities/contact-us.entity'
import paginationContactInterface from './interfaces/paginationContactInterface'

@ApiTags('ContactUs')
@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Post('/')
  async create(@Body() createContactUsDto: CreateContactUsDto) {
    try {
      const contactUs: ContactUs = await this.contactUsService.create(createContactUsDto)
      return {
        statusCode: 201,
        message: 'ContactUs created successfully',
        data: { contactUs }
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
    const contactUs: ContactUs[] = await this.contactUsService.findAll()
    if (!contactUs) {
      throw new NotFoundException('ContactUs does not exist')
    }
    return {
      statusCode: 200,
      message: 'ContactUs fetched successfully',
      contactUs
    }
  }

  //get all contact_us users
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', type: Number, required: true })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'email', type: String, required: false })
  @Get('/:all_user')
  @Roles(Role.CUSTOMER)
  async getAllContactUsUsers(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('email') email?: string,
  ): Promise<paginationContactInterface> {
    return this.contactUsService.getAllContactUsUsers(page, pageSize, email);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    const contactUs = await this.contactUsService.findOneById(id)
    if (!contactUs) {
      throw new NotFoundException('ContactUs does not exist')
    }
    return {
      statusCode: 200,
      message: 'ContactUs fetched successfully',
      contactUs
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateContactUsDto: UpdateContactUsDto) {
    const UpdateResult = await this.contactUsService.update(id, updateContactUsDto)
    console.log('UpdateResult<<<<<', UpdateResult)
    if (!UpdateResult) {
      throw new NotFoundException('ContactUs does not exist')
    }
    return {
      statusCode: 200,
      message: 'ContactUs updated successfully',
      UpdateResult
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.CUSTOMER)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const contactUs = await this.contactUsService.delete({ id })
    if (!contactUs) {
      throw new NotFoundException('ContactUs does not exist')
    }
    return {
      statusCode: 200,
      message: 'ContactUs deleted successfully',
      contactUs
    }
  }
}
