import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { userPost } from './post.entity'

export enum status {
  LIKE = 'like',
  DISLIKE = 'dislike',
  REPORT = 'report'
}

@Entity({ name: 'likeDislike' })
export class likeDislike {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column({})
  postId: string

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: status
  })
  type: string

  @ApiProperty()
  @Column({})
  userId: string

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date

  // relation between posts and likeDislike review table
  @ApiProperty({ type: () => [userPost] })
  @ManyToOne(() => userPost, userPost => userPost.likeDislike)
  userPost: userPost[]
}
