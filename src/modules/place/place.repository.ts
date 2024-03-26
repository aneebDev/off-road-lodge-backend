import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { Place } from './entities/place.entity'
import { CreatePlaceDto } from './dto/create-place.dto'
import { UpdatePlaceDto } from './dto/update-place.dto'

@Injectable()
export class PlaceRepository {
  constructor(@InjectRepository(Place) private placeModel: Repository<Place>) {}

  // create userPlace
  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placeModel.save(createPlaceDto)
  }

  // get all Post
  async findAll(
    whereCondition: FindOptionsWhere<Place>[] | FindOptionsWhere<Place> = null,
    relationShips: string[] = [],
    order: FindOptionsOrder<Place> = {},
    select: FindOptionsSelect<Place> = {}
  ): Promise<Place[]> {
    return this.placeModel.find({
      where: whereCondition,
      relations: relationShips,
      order: order,
      select: select
    })
  }

  // get one Post by id
  async findOneById(
    whereCondition: FindOptionsWhere<Place>[] | FindOptionsWhere<Place> = undefined,
    relationships: string[] = []
  ): Promise<Place | null> {
    return this.placeModel.findOne({
      where: whereCondition ? whereCondition : {},
      relations: relationships
    })
  }

  // find review by id
  async postById(id: string): Promise<Place | null> {
    return this.placeModel.findOne({ where: { id } })
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<UpdateResult> {
    return await this.placeModel.update({ id }, updatePlaceDto)
  }

  async delete(
    whereCondition: FindOptionsWhere<Place>[] | FindOptionsWhere<Place> = undefined
  ): Promise<Place | null> {
    const post = await this.placeModel.findOne({ where: whereCondition })
    if (!post) {
      return null
    }
    await this.placeModel.remove(post)
    return post
  }

  async savePost(post: Place): Promise<Place> {
    return this.placeModel.save(post)
  }

  // post like count
  // async postLikeCount(skip: number, take = 10): Promise<[Place[], number]> {
  //   const posts = await this.postModel.find({
  //     relations: ['likeDislike'],
  //     order: { createdAt: 'DESC' }
  //   })
  //
  //   const filteredPosts = posts
  //     .filter(post => {
  //       const likeCount = post.likeDislike.filter(like => like.type === 'like').length
  //       return likeCount > 0
  //     })
  //     .map(post => {
  //       const likeCount = post.likeDislike.filter(like => like.type === 'like').length
  //
  //       // Find the most recent 'like' created date
  //       let mostRecentLikeDate = null
  //       for (const like of post.likeDislike) {
  //         if (like.type === 'like') {
  //           if (!mostRecentLikeDate || like.createdAt > mostRecentLikeDate) {
  //             mostRecentLikeDate = like.createdAt
  //           }
  //         }
  //       }
  //       return { ...post, likeCount, nominatedDate: mostRecentLikeDate }
  //     })
  //
  //   const totalRecords = filteredPosts.length
  //   const paginatedPosts = filteredPosts.slice(skip, skip + take)
  //   return [paginatedPosts, totalRecords]
  // }

  // ADMIN API
  //get all contactus users for Admin API
  async findAndCount(
    skip: number,
    take: number,
    id?: string,
  ): Promise<[Place[], number]> {
    const whereConditions: any = {};
    // if (id) {
    //   whereConditions.push({
    //     id: Like(`${id}%`),
    //   });
    // }
    if (id !== undefined) {
      whereConditions.id = id;
    }
    const [result, totalCount] = await this.placeModel.findAndCount({
      where: whereConditions,
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return [result, totalCount];
  }

}
