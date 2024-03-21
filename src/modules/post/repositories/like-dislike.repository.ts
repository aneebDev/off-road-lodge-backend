import { Injectable } from '@nestjs/common'
import { likeDislike } from '../entities/like-dislike.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { likeDislikePostDto } from '../dto/like-dislike-post.dto'

@Injectable()
export class likeDislikeRepository {
  constructor(
    @InjectRepository(likeDislike)
    private likeDislikeModel: Repository<likeDislike>,
  ) {}

  //like dislike submit post
  async createLikeDislike(reqBody: likeDislikePostDto): Promise<likeDislike> {
    return this.likeDislikeModel.save(reqBody)
  }

  // get like dislike by id
  async getById(postId: string): Promise<likeDislike[] | null> {
    return this.likeDislikeModel.find({ where: { postId } })
  }

  //delete user with post with likeAndDislike
  async delete(postId: string) {
    const post = await this.likeDislikeModel.find({
      where: { id: postId },
    });
    if (!post) {
      return null
    }
    return await this.likeDislikeModel.remove(post)
  }

  // find like dislike by id
  async findLikeDislikeByUser(userId: string): Promise<likeDislike[] | null> {
    return this.likeDislikeModel.find({ where: { userId } })
  }

  // delete post with post id
  async deleteReview(postId: string): Promise<likeDislike[] | undefined> {
    const post = await this.likeDislikeModel.find({
      where: { postId: postId },
    });
    if (!post) {
      return null
    }
    return await this.likeDislikeModel.remove(post)
  }

  async postCheck(userId: string, postId: string) {
    const result = await this.likeDislikeModel.findOne({
      where: { postId, userId },
    })
    return result
  }
}
