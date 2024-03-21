import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { Comment } from './entities/comment.entity'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Injectable()
export class CommentRepository {
  constructor(@InjectRepository(Comment) private commentModel: Repository<Comment>) {}

  // create userComment
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentModel.save(createCommentDto)
  }

  // get all Comment
  async findAll(
    whereCondition: FindOptionsWhere<Comment>[] | FindOptionsWhere<Comment> = null,
    relationShips: string[] = [],
    order: FindOptionsOrder<Comment> = {},
    select: FindOptionsSelect<Comment> = {}
  ): Promise<Comment[]> {
    return this.commentModel.find({
      where: whereCondition,
      relations: relationShips,
      order: order,
      select: select
    })
  }

  // get one Comment by id
  async findOneById(
    whereCondition: FindOptionsWhere<Comment>[] | FindOptionsWhere<Comment> = undefined,
    relationships: string[] = []
  ): Promise<Comment | null> {
    return this.commentModel.findOne({
      where: whereCondition ? whereCondition : {},
      relations: relationships
    })
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<UpdateResult> {
    return await this.commentModel.update({ id }, updateCommentDto)
  }

  async delete(
    whereCondition: FindOptionsWhere<Comment>[] | FindOptionsWhere<Comment> = undefined
  ): Promise<Comment | null> {
    const post = await this.commentModel.findOne({ where: whereCondition })
    if (!post) {
      return null
    }
    await this.commentModel.remove(post)
    return post
  }
}
