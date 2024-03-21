import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { userPost } from './entities/post.entity'
import { likeDislike } from './entities/like-dislike.entity'
import { PostRepository } from './post.repository'
import { JwtService } from '@nestjs/jwt'
import { likeDislikeRepository } from './repositories/like-dislike.repository'
import { cacheRepository } from '../../cache/cache.repository'
// import { UsersModule } from '../users/users.module'
import { CacheModule } from '@nestjs/common/cache'
import * as redisStore from 'cache-manager-redis-store'
import { User } from '../users/schemas/user.schema'
import { UsersRepository } from '../users/users.respository'

@Module({
  // imports: [TypeOrmModule.forFeature([userPost, likeDislike]), UsersModule, ],
  imports: [TypeOrmModule.forFeature([userPost, likeDislike, User]),
    CacheModule.register({
    store: redisStore,
    uri: process.env.REDIS_URL,
  }), ],
  controllers: [PostController],
  providers: [PostService, PostRepository, JwtService, likeDislikeRepository, cacheRepository, UsersRepository]
})
export class PostModule {}
