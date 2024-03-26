import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { GuidedTour } from './entities/guided-tour.entity'
import { CreateGuidedTourDto } from './dto/create-guided-tour.dto'
import { UpdateGuidedTourDto } from './dto/update-guided-tour.dto'


@Injectable()
export class GuidedToursRepository {
  constructor(@InjectRepository(GuidedTour) private guidedTourModel: Repository<GuidedTour>) {}

  // create GuidedTour
  async create(createGuidedTourDto: CreateGuidedTourDto): Promise<GuidedTour> {
    return this.guidedTourModel.save(createGuidedTourDto)
  }

  // get all GuidedTour
  async findAll(
    whereCondition: FindOptionsWhere<GuidedTour>[] | FindOptionsWhere<GuidedTour> = null,
    relationShips: string[] = [],
    order: FindOptionsOrder<GuidedTour> = {},
    select: FindOptionsSelect<GuidedTour> = {}
  ): Promise<GuidedTour[]> {
    return this.guidedTourModel.find({
      where: whereCondition,
      relations: relationShips,
      order: order,
      select: select
    })
  }

  // get one GuidedTour by id
  async findOneById(
    whereCondition: FindOptionsWhere<GuidedTour>[] | FindOptionsWhere<GuidedTour> = undefined,
    relationships: string[] = []
  ): Promise<GuidedTour | null> {
    return this.guidedTourModel.findOne({
      where: whereCondition ? whereCondition : {},
      relations: relationships
    })
  }

  // find GuidedTour by id
  async postById(id: string): Promise<GuidedTour | null> {
    return this.guidedTourModel.findOne({ where: { id } })
  }

  async update(id: string, updateGuidedTourDto: UpdateGuidedTourDto): Promise<UpdateResult> {
    return await this.guidedTourModel.update({ id }, updateGuidedTourDto)
  }

  async delete(
    whereCondition: FindOptionsWhere<GuidedTour>[] | FindOptionsWhere<GuidedTour> = undefined
  ): Promise<GuidedTour | null> {
    const post = await this.guidedTourModel.findOne({ where: whereCondition })
    if (!post) {
      return null
    }
    await this.guidedTourModel.remove(post)
    return post
  }

  async savePost(post: GuidedTour): Promise<GuidedTour> {
    return this.guidedTourModel.save(post)
  }

  // ADMIN API
  //get all GuidedTour for Admin API
  async findAndCount(
    skip: number,
    take: number,
    id?: string,
  ): Promise<[GuidedTour[], number]> {
    const whereConditions: any = {};
    // if (id) {
    //   whereConditions.push({
    //     id: Like(`${id}%`),
    //   });
    // }
    if (id !== undefined) {
      whereConditions.id = id;
    }
    const [result, totalCount] = await this.guidedTourModel.findAndCount({
      where: whereConditions,
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return [result, totalCount];
  }

}
