import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'contact_us' })
export class ContactUs {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column()
  email: string

  @ApiProperty()
  @Column()
  first_name: string

  @ApiProperty()
  @Column()
  last_name: string

  @ApiProperty()
  @Column()
  message: string

  @ApiProperty()
  @Column()
  phone: string

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date
}
