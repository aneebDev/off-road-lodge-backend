import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '../../../enums/role.enum'

export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column({ nullable: true })
  firstName: string

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string

  @ApiProperty()
  @Column({ nullable: true })
  phoneNo: string

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  email: string

  @ApiProperty()
  @Column({ nullable: true })
  password: string

  @ApiProperty()
  @Column({ nullable: true, type: 'text' })
  image: string

  @ApiProperty()
  @Column({ default: Role.CUSTOMER })
  roles: string

  @ApiProperty()
  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: string

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date
}
