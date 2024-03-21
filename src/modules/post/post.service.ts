import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { PostRepository } from './post.repository'
import { userPost } from './entities/post.entity'
import likeDislikeInterface from './interfaces/like-dislike.interface'
import { jwtConstants } from '../auth/constants/constants'
import { JwtService } from '@nestjs/jwt'
import { UsersRepository } from '../users/users.respository'
import { likeDislikeRepository } from './repositories/like-dislike.repository'
import { CACHE_MANAGER } from '@nestjs/common/cache'
import { Cache } from 'cache-manager';

@Injectable()
export class PostService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,
              private postRepository: PostRepository,
              private jwtService: JwtService,
              private usersRepository: UsersRepository,
              private likeDislikeRepository: likeDislikeRepository,

  ) {}
  // create Post for User
  create(createPostDto: CreatePostDto): Promise<userPost> {
    return this.postRepository.create(createPostDto)
  }

  // get all Posts
  findAll(
    whereCondition: FindOptionsWhere<userPost>[] | FindOptionsWhere<userPost> = undefined,
    relationShips: string[] = [],
    order: FindOptionsOrder<userPost> = {},
    select: FindOptionsSelect<userPost> = {}
  ) {
    return this.postRepository.findAll(whereCondition, relationShips, order, select)
  }
  async findBy(whereCondition) {
    return await this.postRepository.findOneById(whereCondition)
  }

  // get one FAQ by id
  findOneById(id: string, relationShips: string[] = []) {
    return this.postRepository.findOneById({ id }, relationShips)
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id, updatePostDto)
  }

  delete(whereCondition: FindOptionsWhere<userPost>[] | FindOptionsWhere<userPost> = undefined) {
    return this.postRepository.delete(whereCondition)
  }

  //like dislike submit post
    async createLikeDislike(
    likeDislikeInterface: likeDislikeInterface,
    accessToken: string,
  ) {
    const decoded = await this.jwtService.verify(accessToken, {
      secret: jwtConstants.secret,
    });
    const user = await this.usersRepository.findUserById(decoded.id);
    if (!user) {
      throw new NotFoundException('invalid user');
    }
      const cachedToken = await this.cacheManager.get(accessToken);
    if (!cachedToken) {
      throw new UnauthorizedException('Token expired');
    }

    const post = await this.postRepository.postById(
      likeDislikeInterface.postId,
    );
    if (!post) {
      throw new NotFoundException('invalid post id');
    }

    const existingLikeDislike =
      await this.likeDislikeRepository.findLikeDislikeByUser(decoded.id);
    if (existingLikeDislike.length > 0) {
      const submittedPostIds = existingLikeDislike.map(
        (post) => post.postId,
      );
      if (submittedPostIds.includes(likeDislikeInterface.postId)) {
        const result = await this.likeDislikeRepository.postCheck(
          decoded.id,
          likeDislikeInterface.postId,
        );
        if (result.type === 'like') {
          result.type = 'liked';
        } else if (result.type === 'report') {
          result.type = 'reported';
        } else if (result.type === 'dislike') {
          result.type = 'disliked';
        }
        throw new ConflictException(`Already ${result.type}.`);
      }
    }
      post.likeCount++;
      await this.postRepository.savePost(post);

      const likedislike = { ...likeDislikeInterface, userId: decoded.id, likeCount: post.likeCount };
      return await this.likeDislikeRepository.createLikeDislike(likedislike);
  }

  //  post like count
  async postLikeCount(pageNumber: number, pageSize: number) {
    const skip = (pageNumber - 1) * pageSize;

    const [result, totalCount] = await this.postRepository.postLikeCount(
      skip,
      pageSize,
    );

    const totalPages = Math.ceil(totalCount / pageSize);
    if (result.length === 0) {
      throw new NotFoundException('Data not found according to your criteria');
    }
    return {
      records: result,
      totalRecords: totalCount,
      totalPages,
      currentPage: pageNumber,
    };
  }
}
