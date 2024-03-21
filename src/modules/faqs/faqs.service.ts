import { Injectable } from '@nestjs/common'
import { CreateFaqDto } from './dto/create-faq.dto'
import { UpdateFaqDto } from './dto/update-faq.dto'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { Faq } from './entities/faq.entity'
import { FaqsRepository } from './faqs.repository'

@Injectable()
export class FaqsService {
  constructor(private faqsRepository: FaqsRepository) {}
  // create FAQ for User
  create(createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqsRepository.create(createFaqDto)
  }

  // get all FAQ
  findAll(
    whereCondition: FindOptionsWhere<Faq>[] | FindOptionsWhere<Faq> = undefined,
    relationShips: string[] = [],
    order: FindOptionsOrder<Faq> = {},
    select: FindOptionsSelect<Faq> = {}
  ) {
    return this.faqsRepository.findAll(whereCondition, relationShips, order, select)
  }
  async findBy(whereCondition) {
    return await this.faqsRepository.findOneById(whereCondition)
  }

  // get one FAQ by id
  findOneById(id: string, relationShips: string[] = []) {
    return this.faqsRepository.findOneById({ id }, relationShips)
  }

  update(id: string, updateFaqDto: UpdateFaqDto) {
    return this.faqsRepository.update(id, updateFaqDto)
  }

  delete(whereCondition: FindOptionsWhere<Faq>[] | FindOptionsWhere<Faq> = undefined) {
    return this.faqsRepository.delete(whereCondition)
  }
}
