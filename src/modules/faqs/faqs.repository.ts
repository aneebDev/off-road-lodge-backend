import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { CreateFaqDto } from './dto/create-faq.dto'
import { Faq } from './entities/faq.entity'
import { UpdateFaqDto } from './dto/update-faq.dto'

@Injectable()
export class FaqsRepository {
  constructor(@InjectRepository(Faq) private faqModel: Repository<Faq>) {}

  // create FAQ
  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqModel.save(createFaqDto)
  }

  // get all FAQ
  async findAll(
    whereCondition: FindOptionsWhere<Faq>[] | FindOptionsWhere<Faq> = null,
    relationShips: string[] = [],
    order: FindOptionsOrder<Faq> = {},
    select: FindOptionsSelect<Faq> = {}
  ): Promise<Faq[]> {
    return this.faqModel.find({
      where: whereCondition,
      relations: relationShips,
      order: order,
      select: select
    })
  }

  // get one FAQ by id
  async findOneById(
    whereCondition: FindOptionsWhere<Faq>[] | FindOptionsWhere<Faq> = undefined,
    relationships: string[] = []
  ): Promise<Faq | null> {
    return this.faqModel.findOne({
      where: whereCondition ? whereCondition : {},
      relations: relationships
    })
  }

  async update(id: string, updateFaqDto: UpdateFaqDto): Promise<UpdateResult> {
    return await this.faqModel.update({ id }, updateFaqDto)
  }

  async delete(
    whereCondition: FindOptionsWhere<Faq>[] | FindOptionsWhere<Faq> = undefined
  ): Promise<Faq | null> {
    const faq = await this.faqModel.findOne({ where: whereCondition })
    if (!faq) {
      return null
    }
    await this.faqModel.remove(faq)
    return faq
  }
}
