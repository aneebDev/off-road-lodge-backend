import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { likeDislike } from './like-dislike.entity'

@Entity({ name: 'posts' })
export class userPost {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column()
  title: string

  @ApiProperty()
  @Column({ type: 'text' })
  description: string

  @ApiProperty()
  @Column({ default: 0 }) // Default value for like count is 0
  likeCount: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date

  // relation between reviews and likeDislike review table
  @ApiProperty({ type: () => [likeDislike] })
  @OneToMany(() => likeDislike, likeDislike => likeDislike.userPost)
  @JoinTable()
  likeDislike: likeDislike[]
}
