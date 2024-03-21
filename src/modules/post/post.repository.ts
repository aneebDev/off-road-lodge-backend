import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { userPost } from './entities/post.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostRepository {
  constructor(@InjectRepository(userPost) private postModel: Repository<userPost>) {}

  // create userPost
  async create(createFaqDto: CreatePostDto): Promise<userPost> {
    return this.postModel.save(createFaqDto)
  }

  // get all Post
  async findAll(
    whereCondition: FindOptionsWhere<userPost>[] | FindOptionsWhere<userPost> = null,
    relationShips: string[] = [],
    order: FindOptionsOrder<userPost> = {},
    select: FindOptionsSelect<userPost> = {}
  ): Promise<userPost[]> {
    return this.postModel.find({
      where: whereCondition,
      relations: relationShips,
      order: order,
      select: select
    })
  }

  // get one Post by id
  async findOneById(
    whereCondition: FindOptionsWhere<userPost>[] | FindOptionsWhere<userPost> = undefined,
    relationships: string[] = []
  ): Promise<userPost | null> {
    return this.postModel.findOne({
      where: whereCondition ? whereCondition : {},
      relations: relationships
    })
  }

  // find review by id
  async postById(id: string): Promise<userPost | null> {
    return this.postModel.findOne({ where: { id } });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
    return await this.postModel.update({ id }, updatePostDto)
  }

  async delete(
    whereCondition: FindOptionsWhere<userPost>[] | FindOptionsWhere<userPost> = undefined
  ): Promise<userPost | null> {
    const post = await this.postModel.findOne({ where: whereCondition })
    if (!post) {
      return null
    }
    await this.postModel.remove(post)
    return post
  }

  async savePost(post: userPost): Promise<userPost> {
    return this.postModel.save(post);
  }

  // post like count
  async postLikeCount(skip: number, take = 10): Promise<[userPost[], number]> {
    const posts = await this.postModel.find({
      relations: ['likeDislike'],
      order: { createdAt: 'DESC' },
    });

    const filteredPosts = posts
      .filter((post) => {
        const likeCount = post.likeDislike.filter(
          (like) => like.type === 'like',
        ).length;
        return likeCount > 0;
      })
      .map((post) => {
        const likeCount = post.likeDislike.filter(
          (like) => like.type === 'like',
        ).length;

        // Find the most recent 'like' created date
        let mostRecentLikeDate = null;
        for (const like of post.likeDislike) {
          if (like.type === 'like') {
            if (!mostRecentLikeDate || like.createdAt > mostRecentLikeDate) {
              mostRecentLikeDate = like.createdAt;
            }
          }
        }
        return { ...post, likeCount, nominatedDate: mostRecentLikeDate };
      });

    const totalRecords = filteredPosts.length;
    const paginatedPosts = filteredPosts.slice(skip, skip + take);
    return [paginatedPosts, totalRecords];
  }
}
