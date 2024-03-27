import { Injectable } from '@nestjs/common'
import { CreateGuidedTourDto } from './dto/create-guided-tour.dto'
import { UpdateGuidedTourDto } from './dto/update-guided-tour.dto'
import { Atv } from '../atv/entities/atv.entity'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { GuidedToursRepository } from './guided-tours.repository'
import { GuidedTour } from './entities/guided-tour.entity'

@Injectable()
export class GuidedToursService {
  constructor(private guidedToursRepository: GuidedToursRepository) {}

  // create GuidedTour for User
  create(createGuidedTourDto: CreateGuidedTourDto): Promise<GuidedTour> {
    return this.guidedToursRepository.create(createGuidedTourDto)
  }

  // get all GuidedTour
  findAll(
    whereCondition: FindOptionsWhere<Atv>[] | FindOptionsWhere<GuidedTour> = undefined,
    relationShips: string[] = [],
    order: FindOptionsOrder<GuidedTour> = {},
    select: FindOptionsSelect<GuidedTour> = {}
  ) {
    return this.guidedToursRepository.findAll(whereCondition, relationShips, order, select)
  }
  async findBy(whereCondition) {
    return await this.guidedToursRepository.findOneById(whereCondition)
  }

  // get one GuidedTour by id
  findOneById(id: string, relationShips: string[] = []) {
    return this.guidedToursRepository.findOneById({ id }, relationShips)
  }

  update(id: string, updateGuidedTourDto: UpdateGuidedTourDto) {
    return this.guidedToursRepository.update(id, updateGuidedTourDto)
  }

  delete(whereCondition: FindOptionsWhere<GuidedTour>[] | FindOptionsWhere<GuidedTour> = undefined) {
    return this.guidedToursRepository.delete(whereCondition)
  }
}
