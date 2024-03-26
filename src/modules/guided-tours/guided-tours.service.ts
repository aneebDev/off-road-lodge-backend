import { Injectable } from '@nestjs/common';
import { CreateGuidedTourDto } from './dto/create-guided-tour.dto';
import { UpdateGuidedTourDto } from './dto/update-guided-tour.dto';

@Injectable()
export class GuidedToursService {
  create(createGuidedTourDto: CreateGuidedTourDto) {
    return 'This action adds a new guidedTour';
  }

  findAll() {
    return `This action returns all guidedTours`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guidedTour`;
  }

  update(id: number, updateGuidedTourDto: UpdateGuidedTourDto) {
    return `This action updates a #${id} guidedTour`;
  }

  remove(id: number) {
    return `This action removes a #${id} guidedTour`;
  }
}
