import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { GuidedToursService } from './guided-tours.service'
import { CreateGuidedTourDto } from './dto/create-guided-tour.dto'
import { UpdateGuidedTourDto } from './dto/update-guided-tour.dto'

@Controller('guided-tours')
export class GuidedToursController {
  constructor(private readonly guidedToursService: GuidedToursService) {}

  @Post()
  create(@Body() createGuidedTourDto: CreateGuidedTourDto) {
    return this.guidedToursService.create(createGuidedTourDto)
  }

  @Get()
  findAll() {
    return this.guidedToursService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guidedToursService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuidedTourDto: UpdateGuidedTourDto) {
    return this.guidedToursService.update(+id, updateGuidedTourDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guidedToursService.remove(+id)
  }
}
