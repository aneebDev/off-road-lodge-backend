import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { PlaceRepository } from './place.repository'
import { Place } from './entities/place.entity'

@Injectable()
export class PlaceService {
  constructor(
    private placeRepository: PlaceRepository,
  ) {}
  // create Place for User
  create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placeRepository.create(createPlaceDto)
  }

  // get all Place
  findAll(
    whereCondition: FindOptionsWhere<Place>[] | FindOptionsWhere<Place> = undefined,
    relationShips: string[] = [],
    order: FindOptionsOrder<Place> = {},
    select: FindOptionsSelect<Place> = {}
  ) {
    return this.placeRepository.findAll(whereCondition, relationShips, order, select)
  }
  async findBy(whereCondition) {
    return await this.placeRepository.findOneById(whereCondition)
  }

  // get one Place by id
  findOneById(id: string, relationShips: string[] = []) {
    return this.placeRepository.findOneById({ id }, relationShips)
  }

  update(id: string, updatePlaceDto: UpdatePlaceDto) {
    return this.placeRepository.update(id, updatePlaceDto)
  }

  delete(whereCondition: FindOptionsWhere<Place>[] | FindOptionsWhere<Place> = undefined) {
    return this.placeRepository.delete(whereCondition)
  }
}
