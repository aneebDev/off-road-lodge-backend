import { Injectable } from '@nestjs/common'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { AtvRepository } from './atv.repository'
import { Atv } from './entities/atv.entity'
import { CreateAtvDto } from './dto/create-atv.dto'
import { UpdateAtvDto } from './dto/update-atv.dto'

@Injectable()
export class AtvService {
  constructor(private atvRepository: AtvRepository) {}

  // create Atv for User
  create(createAtvDto: CreateAtvDto): Promise<Atv> {
    return this.atvRepository.create(createAtvDto)
  }

  // get all Atv
  findAll(
    whereCondition: FindOptionsWhere<Atv>[] | FindOptionsWhere<Atv> = undefined,
    relationShips: string[] = [],
    order: FindOptionsOrder<Atv> = {},
    select: FindOptionsSelect<Atv> = {}
  ) {
    return this.atvRepository.findAll(whereCondition, relationShips, order, select)
  }
  async findBy(whereCondition) {
    return await this.atvRepository.findOneById(whereCondition)
  }

  // get one Atv by id
  findOneById(id: string, relationShips: string[] = []) {
    return this.atvRepository.findOneById({ id }, relationShips)
  }

  update(id: string, updateAtvDto: UpdateAtvDto) {
    return this.atvRepository.update(id, updateAtvDto)
  }

  delete(whereCondition: FindOptionsWhere<Atv>[] | FindOptionsWhere<Atv> = undefined) {
    return this.atvRepository.delete(whereCondition)
  }
}
