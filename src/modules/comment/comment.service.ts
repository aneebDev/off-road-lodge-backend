import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { CommentRepository } from './comment.repository'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  // create Comment
  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentRepository.create(createCommentDto)
  }

  // get all Comment
  findAll(
    whereCondition: FindOptionsWhere<Comment>[] | FindOptionsWhere<Comment> = undefined,
    relationShips: string[] = [],
    order: FindOptionsOrder<Comment> = {},
    select: FindOptionsSelect<Comment> = {}
  ) {
    return this.commentRepository.findAll(whereCondition, relationShips, order, select)
  }

  // get one Comment by id
  findOneById(id: string, relationShips: string[] = []) {
    return this.commentRepository.findOneById({ id }, relationShips)
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto)
  }

  delete(whereCondition: FindOptionsWhere<Comment>[] | FindOptionsWhere<Comment> = undefined) {
    return this.commentRepository.delete(whereCondition)
  }
}
