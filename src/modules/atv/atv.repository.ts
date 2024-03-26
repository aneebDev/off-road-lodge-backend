import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { Atv } from './entities/atv.entity'
import { UpdateAtvDto } from './dto/update-atv.dto'
import { CreateAtvDto } from './dto/create-atv.dto'

@Injectable()
export class AtvRepository {
  constructor(@InjectRepository(Atv) private atvModel: Repository<Atv>) {}

  // create ATV
  async create(createAtvDto: CreateAtvDto): Promise<Atv> {
    return this.atvModel.save(createAtvDto)
  }

  // get all ATV
  async findAll(
    whereCondition: FindOptionsWhere<Atv>[] | FindOptionsWhere<Atv> = null,
    relationShips: string[] = [],
    order: FindOptionsOrder<Atv> = {},
    select: FindOptionsSelect<Atv> = {}
  ): Promise<Atv[]> {
    return this.atvModel.find({
      where: whereCondition,
      relations: relationShips,
      order: order,
      select: select
    })
  }

  // get one ATV by id
  async findOneById(
    whereCondition: FindOptionsWhere<Atv>[] | FindOptionsWhere<Atv> = undefined,
    relationships: string[] = []
  ): Promise<Atv | null> {
    return this.atvModel.findOne({
      where: whereCondition ? whereCondition : {},
      relations: relationships
    })
  }

  // find ATV by id
  async postById(id: string): Promise<Atv | null> {
    return this.atvModel.findOne({ where: { id } })
  }

  async update(id: string, updateAtvDto: UpdateAtvDto): Promise<UpdateResult> {
    return await this.atvModel.update({ id }, updateAtvDto)
  }

  async delete(
    whereCondition: FindOptionsWhere<Atv>[] | FindOptionsWhere<Atv> = undefined
  ): Promise<Atv | null> {
    const post = await this.atvModel.findOne({ where: whereCondition })
    if (!post) {
      return null
    }
    await this.atvModel.remove(post)
    return post
  }

  // ADMIN API
  //get all contactus users for Admin API
  async findAndCount(skip: number, take: number, id?: string): Promise<[Atv[], number]> {
    const whereConditions: any = {}
    // if (id) {
    //   whereConditions.push({
    //     id: Like(`${id}%`),
    //   });
    // }
    if (id !== undefined) {
      whereConditions.id = id
    }
    const [result, totalCount] = await this.atvModel.findAndCount({
      where: whereConditions,
      skip,
      take,
      order: { createdAt: 'DESC' }
    })

    return [result, totalCount]
  }
}
